# Alkemy Challenge

API para explorar el mundo de Disney. Challenge Alkemy NodeJs 2021 - Gabriel Pamich.

## Documentación
[Documentación en Postman](https://documenter.getpostman.com/view/15080099/UVJWrfnM) // Documentación en swagger en proceso. 

## Testing
En proceso.

## Dependencias
- Sequelize, SequelizeCLI
- BCrypt
- dotenv
- Express
- SendGrid
- JSON Web Token
- mysql2
- Mocha, Chai
- Swagger.



## Instalación

Luego de clonar el repositorio, es importante realizar una serie de pasos para un correcto funcionamiento de la app. (Posterior a utilizar npm install para descargar dependencias).

### 1) Crear archivo de variables de entorno (.env) con el siguiente contenido completo.

```
# Datos DB   
PORT=9116
DB_USER=
DB_PASS=
DB_NAME=
DB_HOST=
DB_DIALECT=mysql

AUTH_SECRET=
AUTH_EXPIRES=
AUTH_ROUNDS=

# SendGrid apikey
SENDGRID_KEY=
# Dirección de email para enviar correos verificada en la api de sendgrid.
SENDGRID_EMAIL_SENDER=

```

#### 2) Ejecutar por UNICA VEZ el módulo firstRun, esto creará las tablas necesarias en la base de datos, y la db en caso de no existir. El modulo first chequea que el archivo dotenv este correctamente configurado.
```bash
npm run first
```
#### 3) Ejecutar normalmente la aplicación.
```bash
npm run dev
```
