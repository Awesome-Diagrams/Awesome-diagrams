FROM gradle:8.10-jdk21 AS compile-image

WORKDIR /app

# Копируем только файлы зависимостей
COPY build.gradle /app/
COPY gradle /app/gradle

# Качаем зависимости (будет кешироваться, если зависимости не меняются)
RUN gradle dependencies --no-daemon || true
RUN gradle build --no-daemon -x test || true

# Теперь копируем весь проект
COPY . /app

# Строим приложение (на этот раз всё есть в кеше)
RUN gradle build --no-daemon -x test -x ktlintCheck

FROM openjdk:21 AS runtime-image

COPY --from=compile-image /app/build/libs/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
