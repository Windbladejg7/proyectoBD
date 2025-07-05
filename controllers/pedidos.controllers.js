import pool from "../db/db.js";

export async function agregarPedido(req, res){
    const id_cliente = req.usuario.id;
    
    const {servicios} = req.body;

    const client = await pool.connect();

    try{
        await client.query("BEGIN");
        const result = await client.query("INSERT INTO PEDIDO(estado, id_cliente) VALUES($1, $2) RETURNING id_pedido", [1, id_cliente]); //Se puede mejorar cambiando estado usando DEFAULT
        const id_pedido = result.rows[0].id_pedido;

        for (let id_servicio of servicios){
            await client.query("INSERT INTO SERVICIO_PEDIDO(id_pedido, id_servicio) VALUES($1, $2)", [id_pedido, id_servicio]);
        }
        await client.query("COMMIT");
        res.status(200).json({mensaje:"Pedido creado exitosamente"});
    }catch(error){
        await client.query("ROLLBACK");
        res.status(500).json({ error: "Error al crear el pedido" });
    }finally{
        client.release();
    }
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