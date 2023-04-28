FROM maven:3-eclipse-temurin-17 as build

# copy the project files
COPY ./pom.xml ./pom.xml

# build all dependencies for offline use
RUN mvn dependency:go-offline -B

# copy your other files
COPY ./src ./src

# build for release
RUN mvn package


FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build target/app.jar ./app.jar
CMD ["java", "-jar", "/app/app.jar"]