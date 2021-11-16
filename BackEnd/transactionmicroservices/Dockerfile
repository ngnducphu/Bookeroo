FROM maven:3.8.2-jdk-11
RUN mkdir /app

WORKDIR /app

COPY . .

RUN mvn -DskipTests=true package

ENTRYPOINT ["java","-jar","transactionmicroservices/target/transactionmicroservices-1.0.0.jar"]