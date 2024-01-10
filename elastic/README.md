# Issues

## Issue 1
Problem:
```bash
docker compose up elastic
```

Yields:
> ERROR: Elasticsearch exited unexpectedly, with exit code 78

Solution:
```bash
sudo sysctl -w vm.max_map_count=262144
```

From Elasticsearch documentation:
> The vm.max_map_count kernel setting must be set to at least 262144 for production use.

For current value, see `/etc/sysctl.conf`:
```bash
grep vm.max_map_count /etc/sysctl.conf
vm.max_map_count=262144
```