# Alkemy Challenge

API para explorar el mundo de Disney. Challenge Alkemy NodeJs 2021 - Gabriel Pamich.

## Documentación
[Documentación en Postman](https://documenter.getpostman.com/view/15080099/UVJWrfnM)

## Dependencias
- Sequelize, SequelizeCLI
- BCrypt
- dotenv
- Express
- SendGrid
- JSON Web Token



## Instalación

Luego de clonar el repositorio, es importante realizar una serie de pasos para un correcto funcionamiento de la app.

### 1) Crear archivo de variables de entorno (.env) con el siguiente contenido.

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


### 2) Ejecutar por consola en el siguiente orden:
#### 1) Ejecutar por primera vez la aplicación, esto creara automáticamente todas las tablas necesarias en la base de datos.
```bash
npm run dev
```
#### 2) Cargar los datos de ejemplo ejecutando la seed.
```bash
npx sequelize-cli db:seed:all
```
 #### 3) Ejecutar normalmente la aplicación.
```bash
npm run dev
```
