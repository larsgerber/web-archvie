FROM openjdk:8-alpine
LABEL maintainer="lars.gerber@unic.com"

ADD target/waterspots-webapp-0.0.1-SNAPSHOT.jar /app/app.jar

# Expose SpringBoot Webserver Port
EXPOSE 8080

CMD java -jar /app/app.jar
