FROM gradle:8.10-jdk21 AS compile-image

WORKDIR /app
COPY . /app

RUN gradle build --no-daemon -x test

FROM openjdk:21 AS runtime-image

COPY --from=compile-image /app/build/libs/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
