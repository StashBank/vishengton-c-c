
FROM ubuntu:20.04

RUN apt-get update
RUN apt-get -y install curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash
RUN apt-get install -y nodejs
RUN node -v
RUN npm -v
RUN npm config set unsafe-perm=true
RUN apt-get install -y openjdk-14-jdk
RUN java --version
RUN javac --version
RUN npm i -g nativescript --unsafe-perm
RUN tns doctor android

COPY ./ ./

ENTRYPOINT ["npx nx run vishengton-c-c-mobile:android --configuration=build "]