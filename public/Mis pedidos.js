const tabla = document.getElementById("pedidos");


async function obtenerMisPedidos() {
    const response = await fetch("http://localhost:3000/pedidos", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    const pedidos = await response.json();

    for(let pedido of pedidos){
        const fila = document.createElement("tr");

        const creacion = document.createElement("td");
        creacion.innerText = pedido.fecha_creacion;
        const entrega = document.createElement("td");
        entrega.innerText = pedido.fecha_entrega;
        const estado = document.createElement("td");
        estado.innerText = pedido.estado;
        const costo = document.createElement("td");
        costo.innerText = pedido.costo;
        const servicios = document.createElement("td");
        const cancelar = document.createElement("button");
        cancelar.innerText = "Cancelar";

        cancelar.addEventListener("click", async ()=>{
            const response = await fetch(`http://localhost:3000/pedidos/${pedido.id_pedido}`,{
                method:"DELETE",
                headers:{
                    "Authorization":localStorage.getItem("token")
                }
            });
            const mensaje = await response.json();
            console.log(mensaje.mensaje);
            fila.remove();
        });

        const lista = document.createElement("ul");
        pedido.servicios.forEach((servicio)=>{
            const elemento = document.createElement("li");
            elemento.innerText = servicio;
            lista.appendChild(elemento);
        });
        servicios.appendChild(lista);

        fila.appendChild(creacion);
        fila.appendChild(entrega);
        fila.appendChild(servicios);
        fila.appendChild(estado);
        fila.appendChild(costo);
        fila.appendChild(cancelar);
        tabla.appendChild(fila);
    }
}

obtenerMisPedidos();