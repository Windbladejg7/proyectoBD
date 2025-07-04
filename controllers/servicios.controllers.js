import pool from "../db/db.js";

export async function getServicios(req, res){
    const result = await pool.query("SELECT * FROM SERVICIO");
    res.json(result.rows);
}

export async function agregarServicio(req, res){
    const {nombre, descripcion, precio} = req.body;
    await pool.query("INSERT INTO SERVICIO(nombre, descripcion, precio) VALUES($1, $2, $3)", [nombre, descripcion, precio]);
    res.sendStatus(200);
}