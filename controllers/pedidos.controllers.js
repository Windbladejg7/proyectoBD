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

async function addServicioAPedido(i, num){
    const result = await pool.query("INSERT INTO SERVICIO_PEDIDO(id_pedido, id_servicio) VALUES($1, $2)", [i, num]);
}

export async function obtenerPedidosDeUsuario(req, res){
    const id_cliente = req.usuario.id;
    const result = await pool.query("SELECT * FROM pedidos_completos WHERE id_cliente=$1", [id_cliente]);
    res.json(result.rows);
}

export async function obtenerTodos(req, res){
    const result = await pool.query("SELECT * FROM pedidos_completos");
    res.json(result.rows);
}

export async function actualizarPedido(req, res){
    const {id} = req.params;
    const {estado} = req.body;
    const result = await pool.query("UPDATE PEDIDO SET estado=$1 WHERE id_pedido=$2 RETURNING estado", [estado, id]);
    res.json(result.rows[0]);
}