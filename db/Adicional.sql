INSERT INTO CLIENTE(nombres, apellidos, fecha_nacimiento, genero, email, password)
VALUES ('Edison Julian', 'Garzon Alvarez', '26-12-2005', 'M', 'juliangarzon@gmail.com', '12345');

INSERT INTO SERVICIO(nombre, descripcion, precio)
VALUES('Lavado de zapatos', 'Lavado suave y desinfección de calzado deportivo', 3.50);

INSERT INTO PEDIDO(estado, id_cliente)
VALUES ('pendiente', 1);

INSERT INTO SERVICIO_PEDIDO(id_pedido, id_servicio)
VALUES (1, 1);
