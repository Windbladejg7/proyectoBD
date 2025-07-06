--Script para crear tablas en PostgreSQL (Copiar y pegar en el psql)
CREATE TABLE CLIENTE(
    id_cliente SERIAL,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(1) CHECK(genero IN ('M', 'F')) NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(id_cliente)
);

CREATE TABLE PEDIDO(
    id_pedido SERIAL PRIMARY KEY,
    fecha_creacion DATE NOT NULL DEFAULT CURRENT_DATE,
    estado INT NOT NULL,
    id_cliente INT,
    fecha_entrega DATE DEFAULT CURRENT_DATE + INTERVAL'5 days',
    CONSTRAINT fk_cliente FOREIGN KEY(id_cliente) REFERENCES CLIENTE(id_cliente),
    CONSTRAINT fk_estado FOREIGN KEY(estado) REFERENCES ESTADO(id_estado)
);

CREATE TABLE SERVICIO(
    id_servicio SERIAL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    precio NUMERIC(5,2) NOT NULL,
    CONSTRAINT pk_servicio PRIMARY KEY(id_servicio)
);

CREATE TABLE SERVICIO_PEDIDO(
    id_pedido INT,
    id_servicio INT,
    CONSTRAINT fk_pedido FOREIGN KEY(id_pedido) REFERENCES PEDIDO(id_pedido),
    CONSTRAINT fk_servicio FOREIGN KEY(id_servicio) REFERENCES SERVICIO(id_servicio),
    CONSTRAINT pk_servicio_pedido PRIMARY KEY(id_pedido, id_servicio)
);

CREATE TABLE ESTADO(
    id_estado SERIAL PRIMARY KEY,
    nombre TEXT CHECK(nombre IN ('pendiente', 'completado'))
);

CREATE TABLE EMPLEADO(
    id_empleado SERIAL,
    nombres TEXT NOT NULL,
    apellidos TEXT NOT NULL,
    genero VARCHAR(1) CHECK(genero IN ('M', 'F')) NOT NULL,
    email TEXT UNIQUE  NOT NULL,
    password TEXT NOT NULL,
    CONSTRAINT pk_empleado PRIMARY KEY(id_empleado);
);

CREATE VIEW pedidos_completos AS
SELECT 
  p.id_pedido,
  p.id_cliente,
  c.nombres || ' ' || c.apellidos AS cliente,
  TO_CHAR(p.fecha_creacion, 'YYYY-MM-DD') AS fecha_creacion,
  TO_CHAR(p.fecha_entrega, 'YYYY-MM-DD') AS fecha_entrega,
  c.email,
  e.nombre AS estado,
  SUM(s.precio) AS costo,
  JSON_AGG(s.nombre) AS servicios
FROM PEDIDO p 
INNER JOIN SERVICIO_PEDIDO ps ON ps.id_pedido = p.id_pedido
INNER JOIN SERVICIO s ON s.id_servicio = ps.id_servicio
INNER JOIN CLIENTE c ON c.id_cliente = p.id_cliente
INNER JOIN ESTADO e ON e.id_estado = p.estado
GROUP BY p.id_pedido, c.nombres, c.apellidos, c.email, p.fecha_creacion, p.fecha_entrega, e.nombre
ORDER BY p.id_pedido;