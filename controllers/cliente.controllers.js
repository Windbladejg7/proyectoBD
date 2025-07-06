import pool from "../db/db.js";

export async function getClientes(req, res) {
    /*const user = req.usuario;
    const autorizado = await pool.query("SELECT * FROM EMPLEADO WHERE id_empleado=$1", [user.id]);
    if(!autorizado.rows.length>0){
        return res.status(404).json({error:"Usuario no autorizado"});
    }*/
    const result = await pool.query("SELECT * FROM CLIENTE");
    res.json(result.rows);
}

export async function obtenerUsuario(req, res) {
    const { email } = req.usuario;

    const result = await pool.query("SELECT nombres ||' '|| apellidos AS nombre FROM CLIENTE WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.sendStatus(404);
    res.json(result.rows[0]);

}

