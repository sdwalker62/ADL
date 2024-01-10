FROM python:3.10.13-slim-bullseye
WORKDIR /root/app
COPY ./ ./
RUN pip install -r requirements.txt
CMD [ "python", "server.py" ]