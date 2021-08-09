FROM continuumio/miniconda3:latest

RUN apt-get update && apt-get upgrade -y && apt-get install wget -y

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -y nodejs && apt-get install -y npm

COPY ./backend/requirements.yml /backend/requirements.yml

RUN /opt/conda/bin/conda env create -f /backend/requirements.yml

ENV PATH /opt/conda/envs/django_base/bin:$PATH

RUN echo "source activate django_base" >~/.bashrc

COPY ./scripts /scripts
RUN chmod +x ./scripts*

COPY ./backend /backend

RUN mkdir -p /r-client-web
RUN mkdir -p /r-client-web_temp
WORKDIR r-client-web_temp
COPY ./r-client-web/package.json /r-client-web_temp/
RUN npm install
COPY ./r-client-web /r-client-web_temp
RUN npm run build

WORKDIR /backend
