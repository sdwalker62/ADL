FROM python:3.10.13-slim-bullseye
WORKDIR /root/app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY server.py elastic_utils.py ./
CMD [ "python", "-u", "server.py" ]