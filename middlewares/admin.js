import pool from "../db/db.js";

export async function accesoRestringido(req, res, next){
    const user = req.usuario;
    const autorizado = await pool.query("SELECT * FROM EMPLEADO WHERE id_empleado=$1", [user.id]);
    if(!autorizado.rows.length>0){
        return res.status(404).json({error:"Usuario no autorizado"});
    }
    next();
}