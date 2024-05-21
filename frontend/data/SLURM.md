# SLURM Setup Documentation for a Single Node Cluster
Here are the instructions to set up a single node SLURM cluster on your machine. The following setup works for Ubuntu 22.04.3.

## Step 1: Setup MariaDB Database for Accounting
Before you can start building your SLURM cluster, you must first setup a database for storage of account information and resource limits. This is necessary if you want to enforce resource limitations on certain users or groups within your cluster. <br>
SLURM has built-in support for MySQL. Here we show the steps for setting up a MariaDB database server on your system and creating a SLURM accounting database that your SLURM daemons can later communicate with to store and access information. <br><br>
 
* Install MariaDB.
    ```shell
    sudo apt install mariadb-server
    ```

* Configure MySQL.
    ```shell
    sudo mysql_secure_installation
    ```
    When prompted feel free to remove anonymous users and disable remote root login. Also you may switch to unix_authentication, however, its not required as it should be enabled by default. This means that you can login as the 'root' user in MariaDB only if you are the 'root' user in your system, or if you have sudo privileges. You may choose to set a password if you wish to allow login as root without sudo.

* Login as root user in MariaDB. Note that you need sudo privileges for this.
    ```shell
    sudo mysql -u root
    ```
    Following this you should be logged in as root inside your database.

* Create SLURM accounting database and a SLURM user with complete access to modify this database. Feel free to set 'password' to something more secure if desired.
    ```sql
    CREATE DATABASE slurm_acct_db;
    CREATE USER 'slurm'@'localhost' IDENTIFIED BY 'password';
    GRANT ALL ON slurm_acct_db.* TO 'slurm'@'localhost';
    FLUSH PRIVILEGES;
    EXIT;
    ```
    You should now be logged out of MariaDB.

* Enable the MariaDB server to start automatically on system reboot and restart the database server.

    ```shell
    sudo systemctl enable mariadb
    sudo systemctl restart mariadb
    ```

* You should now be able to view the slurm user in the users table and check the databases table to see if the slurm_acct_db has been created.

    ```shell
    sudo mysql -u root
    SELECT User, Host, plugin FROM mysql.user;
    SHOW DATABASES;
    EXIT;
    ```

* Optional: Change authentication plugin afterwards for root user.

    ```shell
    sudo mysql -u root
    ALTER USER 'root'@'localhost' IDENTIFIED WITH unix_socket;
    FLUSH PRIVILEGES;
    EXIT;
    ```

## Step 2: Setup Munge for Authentication
SLURM uses the MUNGE authentication tool to allow for secure communication between the different SLURM daemons running on our cluster.

* Install MUNGE.
    ```shell
    sudo apt install munge
    ```

* Check if installation is correct. You should see a STATUS: SUCCESS message on running the below command.
    ```shell
    munge -n | unmunge | grep STATUS
    ```
    Also you should be able to find a munge key located at /etc/munge/munge.key. If you can't find it, create one using the following command:
    ```shell
    sudo /usr/sbin/mungekey
    ```

* Set appropriate permissions for all munge files. Note that a munge user should have been automatically created after installing MUNGE. You can check this with cat /etc/passwd.
    ```shell
    sudo chown -R munge: /etc/munge/ /var/log/munge/ /var/lib/munge/ /run/munge/
    sudo chmod 0700 /etc/munge/ /var/log/munge/ /var/lib/munge/
    sudo chmod 0755 /run/munge/
    sudo chmod 0700 /etc/munge/munge.key
    sudo chown -R munge: /etc/munge/munge.key
    ```

* Modify MUNGE configuration file to allow system logging.
    ```shell
    sudo sed -i '/# OPTIONS/aOPTIONS="--syslog"' /etc/default/munge
    ```

* Enable the munge daemon to start on system reboot and restart it.
    ```shell
    sudo systemctl enable munge
    sudo systemctl restart munge
    ```

## Step 3: Setup SLURM

* Install SLURM. 
    ```shell
    sudo apt install slurm-wlm
    sudo apt install slurmdbd
    ```
    The above should install 3 daemons in total:
    * slurmd - The daemon that runs on each compute node in the cluster.
    * slurmctld - The central controller daemon that communicates with each slurmd and managaes all nodes in the cluser.
    * slurmdbd - The database daemon that will communicate with our MariaDB database to store accounting information and resource limits.

    Since our setup only includes one node in our cluster, all 3 daemons will be running on the same server.

* Configure slurmdbd. Create slurmdbd.conf file and set proper permissions and configurations to allow for proper accounting.
    ```shell
    sudo touch /etc/slurm/slurmdbd.conf
    sudo chown slurm:slurm /etc/slurm/slurmdbd.conf
    sudo chmod 600 /etc/slurm/slurmdbd.conf
    sudo sh -c "cat > /etc/slurm/slurmdbd.conf" <<EOF
    # logging level
    ArchiveEvents=no
    ArchiveJobs=no
    ArchiveSteps=no
    ArchiveSuspend=no

    # service
    DbdHost=$(hostname -s)
    SlurmUser=slurm
    AuthType=auth/munge

    # logging; remove this to use syslog
    LogFile=/var/log/slurm/slurmdbd.log

    # database backend
    StoragePass=password
    StorageUser=slurm
    StorageType=accounting_storage/mysql
    StorageLoc=slurm_acct_db
    EOF
    ```
    Please note that the permissions must be set correctly for slurmdbd to work. Any modifications from the above may prevent the database daemon from starting up.

* Increase storage size for buffer pools and log files, as well as lock wait timeout to allow for extended queries:
    ```shell
    sudo sh -c "cat >> /etc/mysql/my.cnf" <<EOF
    [mysqld]
    innodb_buffer_pool_size=4096M
    innodb_log_file_size=64M
    innodb_lock_wait_timeout=900
    max_allowed_packet=16M
    EOF
    ```

* Configure slurm. Usually in multi-node clusters this config file must be present in the controller node as well as all worker nodes. Make sure to set up the proper file permissions here as well. We set up the config file to allow the use of GPUs through gres (General Resources).
    ```shell
    sudo touch /etc/slurm/slurm.conf
    sudo chown slurm:slurm /etc/slurm/slurm.conf
    sudo chmod 664 /etc/slurm/slurm.conf
    sudo sh -c "cat > /etc/slurm/slurm.conf" <<EOF
    # identification
    ClusterName=$(hostname -s)
    ControlMachine=$(hostname -s)

    # authentication
    AuthType=auth/munge

    # service
    # proctrack/cgroup controls the freezer cgroup
    SlurmUser=slurm
    SlurmctldPort=6817
    SlurmdPort=6818
    SlurmdSpoolDir=/var/lib/slurm/slurmd
    StateSaveLocation=/var/lib/slurm/slurmctld
    SlurmctldPidFile=/var/run/slurmctld.pid
    SlurmdPidFile=/var/run/slurmd%n.pid
    SwitchType=switch/none
    ProctrackType=proctrack/linuxproc
    MpiDefault=none
    RebootProgram=/sbin/reboot

    # get back on track as soon as possible
    ReturnToService=2

    # logging
    SlurmctldLogFile=/var/log/slurm/slurmctld.log
    SlurmdLogFile=/var/log/slurm/slurmd.log

    # accounting
    AccountingStorageType=accounting_storage/slurmdbd
    AccountingStorageHost=$(hostname -s)
    AccountingStorageEnforce=limits
    AccountingStorageTRES=gres/gpu
    JobAcctGatherType=jobacct_gather/linux

    # checkpointing
    #CheckpointType=checkpoint/blcr

    # scheduling
    SchedulerType=sched/backfill
    PriorityType=priority/multifactor
    PriorityDecayHalfLife=3-0
    PriorityMaxAge=7-0
    PriorityFavorSmall=YES
    PriorityWeightAge=1000
    PriorityWeightFairshare=0
    PriorityWeightJobSize=125
    PriorityWeightPartition=1000
    PriorityWeightQOS=0
    PreemptMode=suspend,gang
    PreemptType=preempt/partition_prio

    # wait 30 minutes before assuming that a node is dead
    SlurmdTimeout=1800

    # core and memory is the scheduling units
    # task/cgroup controls cpuset, memory and devices cgroups
    SelectType=select/cons_tres
    SelectTypeParameters=CR_Core_Memory,CR_CORE_DEFAULT_DIST_BLOCK
    TaskPlugin=task/affinity,task/cgroup

    # computing nodes
    GresTypes=gpu
    NodeName=$(hostname -s) Gres=gpu:$(nvidia-smi --query-gpu=gpu_name --format=csv,noheader | wc -l) RealMemory=$(grep "^MemTotal:" /proc/meminfo | awk '{print int($2/1024)}') Sockets=$(grep "^physical id" /proc/cpuinfo | sort -uf | wc -l) CoresPerSocket=$(grep "^cpu cores" /proc/cpuinfo | awk -F':' 'NR==1{print $2}' | xargs) ThreadsPerCore=$(lscpu | awk -F':' '/^Thread\(s\) per core/ {print $2}' | xargs) State=UNKNOWN

    # partitions
    PartitionName=DEFAULT  Nodes=$(hostname -s) OverSubscribe=FORCE:1 MaxTime=INFINITE State=UP
    PartitionName=intern  Priority=10 Default=No
    PartitionName=employee Priority=20 Default=Yes AllowAccounts=employee_account_1,employee_account_2,employee_account_3
    EOF
    ```
    Feel free to change the partition names and add more if required. Think of partitions of queues that users can submit SLURM jobs to. The above config creates two partions - intern and employee, both with configurations set by the DEFAULT partition configuration. In the above configuration, whenever a user submits a job without specifying the partition, it defaults to the employee partition.<br><br> 
    Accounts are groups of users. When you set the AllowAccounts parameter for a particular partition, it means that only users belonging to those accounts will be allowed to submit jobs to that partition.<br><br>
    The line 'AccountingStorageEnforce=limits' is required if you want to set resource limits on certain users within your cluster. <br><br>
    The line 'GresTypes=gpu' is necessary for allowing GPU support in SLURM. GRES stands for General Resources. So is the line 'SelectType=select/cons_tres' (do NOT set this to cons_res if you want GPU support). 


* Create gres.conf file. This is required if you want to allow GPU support for SLURM.
    ```shell
    sudo touch /etc/slurm/gres.conf
    sudo chown slurm:slurm /etc/slurm/gres.conf
    sudo chmod 664 /etc/slurm/gres.conf
    sudo sh -c "cat > /etc/slurm/gres.conf" <<EOF
    Name=gpu File=/dev/nvidia[0-$(nvidia-smi --query-gpu=gpu_name --format=csv,noheader | wc -l | awk '{print $1 - 1}')]
    EOF
    ```

* Enable and restart slurmd, slurmctld, and slurmdbd.
    ```shell
    sudo systemctl enable slurmd slurmdbd slurmctld
    sudo systemctl restart slurmd slurmdbd slurmctld
    ```
    You can check the status of all 5 of your daemons now and make sure that they're running:
    ```shell
    systemctl status slurmd slurmctld slurmdbd, mariadb, munge
    ```
    Finally, make sure to set the node as idle so that it's ready to accept jobs:
    ```shell
    sudo scontrol update nodename=$(hostname -s) state=idle
    ```

## Step 4: Create Cluster, Accounts, and Users

* Create cluster.
    ```shell
    sudo sacctmgr -i add cluster $(hostname -s)
    ```

* Create accounts. Accounts are groups of users. Here we'll create 4 accounts: employee_account_1, employee_account_2, employee_account_3, and intern_account. Make sure the names match with the names you used for the AllowAccounts parameter in your slurm.conf file.
    ```shell
    sudo sacctmgr -i add account employee_account_1 Description="1st Employee Account" Organization="Org 1"
    sudo sacctmgr -i add account employee_account_2 Description="2nd Employee Account" Organization="Org 2"
    sudo sacctmgr -i add account employee_account_3 Description="3rd Employee Account" Organization="Org 3"
    sudo sacctmgr -i add account intern_account Description="Intern Account" Organization="Intern Org"
    ```

* Create users. Users in SLURM must have the same username as the system users that will be submitting the job. Thus, if your system username is 'johndoe' then to submit jobs to SLURM you must also create a SLURM user called 'johndoe'.
Here we'll create 2 users - employee_1, that belongs to the accounts employee_account_1, employee_account_2, and employee_account_3, and intern_1, that belongs to the account intern_account.

    ```shell
    sudo sacctmgr add user employee_1 DefaultAccount=employee_account_1 Account=employee_account_1,employee_account_2,employee_account_3 AdminLevel=Admin Partition=employee
    sudo sacctmgr add user intern_1 DefaultAccount=intern_account Partion=intern 
    ```
    The above commands set the default accounts for our new users as well as the default partitions to which they'll submit their SLURM jobs. Note that you can add multiple users to a single account. Also, a single user can be part of multiple accounts.

* Check for newly created users, accounts, and cluster:
    ```shell
    sacctmgr show user
    sacctmgr show account
    sacctmgr show cluster
    ```

* Modify and delete users, accounts, clusters. To modify / delete a created user, account or cluster you can use the following format:
    ```shell
    sudo sacctmgr modify <entity> set <options> where <options>
    ```
    For example, to modify the name of the user employee_1, we can do:
    ```shell
    sudo sacctmgr modify user set name=permanent_employee_1 where name=employee_1
    ```shell
    Similarly, we can delete this user by running the following:
    ```shell
    sudo sacctmgr remove user where name=employee_1
    ```
    Check out the SLURM accounting page for more info: https://slurm.schedmd.com/accounting.html

* Set user resource limits. Here we're limiting the amount of resources the user intern_1 can use. We give them 16 CPU threads, 10 GB of memory, and 1 GPU.
    ```shell
    sacctmgr modify user intern_1 set GrpTRES=cpu=16,mem=100G,gres/gpu=1
    ```
    To unset these limits run the following:
    ```shell
    sacctmgr modify user intern_1 set GrpTRES=cpu=-1,mem=-1,gres/gpu=-1
    ```

* Check the user resource limits.
    ```shell
    sacctmgr show associations user=ronitagarwala01,test_intern format=User%25,GrpTRES%50,Account,Partition,Cluster%25
    ```
    Note an association is the most basic accounting unit in SLURM. It a set that consists of a user, account, cluster, and optionally a partition.

## Step 5: Submit Batch Jobs to your SLURM Cluster.

* In order to submit a job on your SLURM cluster, you must be logged in to your system as one of the users in your SLURM database. A SLURM job consists of a bash script with a bunch of SBATCH directives. Here is an example of our batch job script slurm_tester.sh:
    ```shell
    #!/bin/sh
    #SBATCH --time=200
    #SBATCH --gres=gpu:1
    #SBATCH --output=slurm_output.txt
    #SBATCH --job-name=SLURM_Testing
    #SBATCH --partition=employee
    #SBATCH --account=employee_account_1
    #SBATCH --cpus-per-task=1
    #SBATCH --ntasks=1
    #SBATCH --mem-per-gpu=32G
    srun -l python3 slurm_tester.py
    ```
    Here we run a simple python script called slurm_tester.py that we have defined in the same directory as slurm_tester.sh. Here is what it looks like:
    ```python
    import time
    time.sleep(20) # Sleep for 20 seconds
    print("Hello World!")
    ``` 
    A batch script in slurm consists of a bunch of Sbatch directives, which are comments starting with #SBATCH that tell SLURM about the job requirements - including requested resources and account configurations - for this batch. Not all of these directives need to befined for each job. Here are some descriptions of each directive.<br><br>
    * --time: Time requested for job in minutes. If job execution does not complete withinin specified time limit, it will be cancelled.<br><br>
    * --gres: Used to specify general resources. Here used to request a single GPU for the batch job.<br><br>
    * --output: Specify the output file.<br><br>
    * --job-name: Specify job name.<br><br>
    * --partition: Specify the partition to submit the job to.<br><br>
    * --account: Specify the account to submit the job to.<br><br>
    * ntasks: Number of tasks to be launched. A task is an instance of your program that is launched on a compute node. Tasks can run in parallel and use MPI to communicate with one another.<br><br>
    * --cpus-per-task: Number of CPU threads required per task.<br><br>
    * --mem-per-gpu: Amount of memory per GPU required for the job. Here we set it to 32 GB per GPU. When no unit is specified after the number, the default units are in MB. Note that alternatives include --mem for setting memory allocation and --mem-per-cpu for setting memory per CPU. Note that only one of these three directives can be used at a time.

    More directives can be found in the official SLURM docs: https://slurm.schedmd.com/sbatch.html

    The srun command launches a job step in SLURM, which are sets of possibly parallel tasks within a job. We can have multiple srun statements with our batch script.<br>

    To submit our batch job to SLURM, run the following command from your terminal:
    ```shell
    sbatch slurm_tester.sh
    ```

* Check the status of your submitted job with squeue.
    ```shell
    squeue
    ```
    Once a job is submitted to SLURM, it either starts executing if there are enough resources available, or its put into a queue to wait for resources to be free.

* See information about submitted jobs, including job ID, status, name, associated user, account, partition, and allocated resources:
    ```shell
    sudo sacct --format=JobID,JobName,User,Account,Partition,AllocCPUS,State,ExitCode,AllocTRES%50
    ```
* Cancel a running job:
    ```shell
    scancel <JobID>
    ```
* For troubleshooting, try looking at the slurmctld, slurmd, and slurmdbd log files:
    ```shell
    sudo cat /var/log/slurm/slurmctld.log
    sudo cat /var/log/slurm/slurmd.log
    sudo cat /var/log/slurm/slurmdbd.log
    ```


## Optional: Set up a more secure password for slurm database user
* Create password with pwgen:
    ```shell
    sudo apt install pwgen
    DB_SLURM_PASS=$(pwgen -s 16 1)
    ```
* Change slurm user password:
    ```shell
    sudo mysql -u root -e "ALTER USER 'slurm'@'localhost' IDENTIFIED BY '${DB_SLURM_PASS}';"
    ```
* Store your password in /etc/slurm directory for safe-keeping. Also change permissions so that only slurm user or root / superuser can access it. This is important if you don't want anyone to change the database and thus get access to more resources than they are allocated:
    ```shell
    echo $DB_SLURM_PASS | sudo tee /etc/slurm/slurm_db_password.txt > dev_null
    sudo chmod 600 /etc/slurm/slurm_db_password.txt
    ```
* Change StoragePass in slurmdbd.conf:
    ```shell
    sudo sed -i "s/StoragePass=.*/StoragePass=$DB_SLURM_PASS/" /etc/slurm/slurmdbd.conf
    ```

## Additional Resources
* Single Cluster Setup: https://rolk.github.io/2015/04/20/slurm-cluster
* Simple Setup without Accounting: https://github.com/SergioMEV/slurm-for-dummies
* Another simple setup: https://drtailor.medium.com/how-to-setup-slurm-on-ubuntu-20-04-for-single-node-work-scheduling-6cc909574365
* Setting up GPU Support: https://www.bodunhu.com/blog/posts/set-up-slurm-across-multiple-machines/
* SLURM Quickstart: https://slurm.schedmd.com/quickstart.html
* SBATCH Directives: https://slurm.schedmd.com/sbatch.html
* SLURM Accunting: https://slurm.schedmd.com/accounting.html
* SLURM Resource Limits: https://slurm.schedmd.com/resource_limits.html
* Useful Ubuntu Discussion Board: https://ubuntuforums.org/showthread.php?t=2404746
* Niflheim SLURM Setup Guide: https://wiki.fysik.dtu.dk/Niflheim_system/
* SLURM Man Pages for different SLURM commands: https://slurm.schedmd.com/man_index.html







