import pool from "../db/db.js";

export async function getClientes(req, res){
    const result = await pool.query("SELECT * FROM CLIENTE");
    res.json(result.rows);
}