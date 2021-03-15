FROM alpine:latest
COPY ./out/production/others /usr/out/
WORKDIR /usr/out/
RUN apk --update add openjdk8-jre
CMD ["java", "edu.unicesar.activity.main.Main"]
