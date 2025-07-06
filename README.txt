Instalar postgreSQL y nodejs
Leer el archivo config.sql en la carpeta db de este proyecto
Una vez hecho eso y tengan instalado nodejs, abrir el cmd en la carpeta del proyecto y escribir "npm install"
Añadir el archivo .env que les compartí a la carpeta del proyecto el cual tiene esta estructura

PORT=3000
DB_PORT=5432
DB_NAME=lavanderiavirtual
DB_USER=postgres
DB_PASSWORD=(escribir la contraseña que usaron para postgres)
HOST=localhost
JWT_SECRET=misecreto

Una vez ajusten el .env con sus datos, en el cmd estando en la carpeta del proyecto escribir "npm run start" 
y dejan el cmd abierto. Ahora pueden ir al navegador y escriben

localhost:3000/register -> Esta es para los usuarios
localhost:3000/adminlogin -> Para el panel de administradores. Para este primero hagan:

Peguen lo siguiente en el psql:
INSERT INTO EMPLEADO(nombres, apellidos, genero, email, password)
VALUES('Edison Julian', 'Garzón Alvarez', 'M', 'admin@gmail.com', '$2b$10$MfoHbAgZ1wZ4.hgAJHHsze2Mwv2w70Q/wLJ6.Se33HJ..sWnbVlOW');

Ahora cuando vayan a "localhost:3000/adminlogin" en el navegador ingresen
correo electronico: admin@gmail.com
contraseña: contraseña