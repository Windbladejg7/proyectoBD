const tabla = document.getElementById("pedidos");

async function consultarPedidos() {
    const response = await fetch("http://localhost:3000/pedidos/admin",{
        headers:{
            "Authorization":localStorage.getItem("token")
        }
    });
    const pedidos = await response.json();
    console.log(pedidos);
    pedidos.forEach((pedido)=>{
        const fila = document.createElement("tr");
    
        const id = document.createElement("td");
        id.innerText = pedido.id_pedido;

        const client = document.createElement("td");
        client.innerText = pedido.cliente;

        const creacion = document.createElement("td");
        creacion.innerText = pedido.fecha_creacion;

        const entrega = document.createElement("td");
        entrega.innerText = pedido.fecha_entrega;

        const servicios = document.createElement("td");
        const lista = document.createElement("ul");
        pedido.servicios.forEach((servicio)=>{
            const item = document.createElement("li");
            item.innerText = servicio;
            lista.appendChild(item);
        });
        servicios.appendChild(lista);

        const estado = document.createElement("td");
        estado.innerText = pedido.estado;

        const costo = document.createElement("td");
        costo.innerText = pedido.costo;

        const cambiarEstado = document.createElement("select");
        const pendiente = document.createElement("option");
        const completado = document.createElement("option");

        pendiente.innerText = "Pendiente";
        pendiente.value = "1";
        completado.innerText = "Completado";
        completado.value = "2";

        pedido.estado === "pendiente" ? cambiarEstado.appendChild(pendiente) : cambiarEstado.appendChild(completado);
        primero = cambiarEstado.firstChild;
        primero === pendiente ? cambiarEstado.appendChild(completado) : cambiarEstado.appendChild(pendiente);

        cambiarEstado.addEventListener("change", async ()=>{
            console.log(cambiarEstado.value);
            const response = await fetch(`http://localhost:3000/pedidos/${pedido.id_pedido}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":localStorage.getItem("token")
                },
                body:JSON.stringify({estado:cambiarEstado.value})
            });
            const datos = await response.json();
            if(datos.estado === 1){
                estado.innerText = "pendiente";
            }else{
                estado.innerText = "completado";
            }
        });

        fila.appendChild(id);
        fila.appendChild(client);
        fila.appendChild(creacion);
        fila.appendChild(entrega);
        fila.appendChild(servicios);
        fila.appendChild(estado);
        fila.appendChild(costo);
        fila.appendChild(cambiarEstado);
        tabla.appendChild(fila);
    });
}

consultarPedidos();


