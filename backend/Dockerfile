FROM python:3.9
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY . /app
RUN apt-get update
RUN apt-get install -y python3-pykcs11 swig
RUN pip install -r ./requirements.txt
