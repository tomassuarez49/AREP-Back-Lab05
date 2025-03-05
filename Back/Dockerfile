# Paso 1: Usa una imagen base de Java con JDK 21
FROM openjdk:21-jdk-slim

# Paso 2: Define el directorio de trabajo
WORKDIR /app

# Paso 3: Copia el archivo JAR de tu aplicación al contenedor
COPY target/arep-0.0.1-SNAPSHOT.jar app.jar

# Paso 4: Expone el puerto en el contenedor
EXPOSE 8080

# Paso 5: Ejecuta la aplicación cuando el contenedor se inicie
ENTRYPOINT ["java", "-jar", "app.jar"]
