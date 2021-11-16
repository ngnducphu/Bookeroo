FROM maven:3.8.2-jdk-11
RUN mkdir /app

WORKDIR /app

COPY . .

RUN mvn -DskipTests=true package

ENTRYPOINT ["java","-jar","bookmicroservices/target/bookmicroservices-1.0.0-exec.jar"]