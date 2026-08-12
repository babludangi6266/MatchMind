# Stage 1: Build the Maven application
FROM maven:3.9.6-eclipse-temurin-19 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Java Runtime environment
FROM eclipse-temurin:19-jre-alpine
WORKDIR /app
COPY --from=build /app/target/matchmind-backend-1.0.0.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
