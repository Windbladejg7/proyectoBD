import pool from "../db/db.js";

export async function agregarPedido(req, res){
    const id_cliente = req.usuario.id;
    console.log(req.usuario);
    const {servicios} = req.body;
    console.log(servicios);
    const result = await pool.query("INSERT INTO PEDIDO(estado, id_cliente) VALUES($1, $2) RETURNING id_pedido", [1, id_cliente]);
    const i = result.rows[0].id_pedido;
    servicios.forEach((num)=>{
        addServicioAPedido(i, num);
    });
    res.sendStatus(200);
}

export async function obtenerPedidosDeUsuario(req, res){
    const id_cliente = req.usuario.id;
    const result = await pool.query("SELECT * FROM pedidos_completos WHERE id_cliente=$1", [id_cliente]);
    res.json(result.rows);
}

async function addServicioAPedido(i, num){
    const result = await pool.query("INSERT INTO SERVICIO_PEDIDO(id_pedido, id_servicio) VALUES($1, $2)", [i, num]);
}