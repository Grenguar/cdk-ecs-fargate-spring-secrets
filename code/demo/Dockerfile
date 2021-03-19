FROM openjdk:8-jdk-alpine

COPY build/libs/demo*.jar app.jar

ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/app.jar"]

EXPOSE 80