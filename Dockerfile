FROM node:10.24.1
WORKDIR /root
COPY . .
RUN apt-get update && \
    apt-get install -y \
    wget \
    curl \
    ca-certificates \
    rsync \
    git \
    vim \
    libstdc++ \
    nodejs
RUN npm install
RUN sed -i 's/#force_color_prompt=yes/force_color_prompt=yes/' /root/.bashrc
CMD ["/bin/sh"]
# Docker Requirement
# Node.js 10.24.1
# npm 6.14.12
# git 2.31.0
# libstdc++ 4.9-dev (nodegit requirement https://github.com/nodegit/nodegit)
# Ubuntu 20.04
