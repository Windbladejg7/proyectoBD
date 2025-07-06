const tabla = document.getElementById("pedidos");
const mensaje = document.getElementById("mensaje");
const sinPedidos = document.getElementById("sinPedidos");

async function obtenerMisPedidos() {
    const response = await fetch("/pedidos", {
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("token")
        }
    });

    const pedidos = await response.json();

    if (pedidos.length === 0) {
        sinPedidos.textContent = "No tienes pedidos aún. ";
        sinPedidos.innerHTML+=`<a href="/">Haz clic aquí para agregar uno.</a>`;
        return;
    } else {
        sinPedidos.textContent = ""; // Limpiar si había mensaje previo
    }

    for (let pedido of pedidos) {
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
        const celdaCancelar = document.createElement("td");
        const cancelar = document.createElement("button");
        cancelar.innerText = "Cancelar";
        cancelar.classList.add("cancelar-btn");

        cancelar.addEventListener("click", async () => {
            const response = await fetch(`/pedidos/${pedido.id_pedido}`, {
                method: "DELETE",
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const datos = await response.json();
            mensaje.textContent = datos.mensaje;
            if (response.ok) {
                mensaje.style.color = "green";
                fila.remove();
            } else {
                mensaje.style.color = "red";
            }
            setTimeout(() => mensaje.textContent = "", 2000);
        });

        celdaCancelar.appendChild(cancelar);

        const lista = document.createElement("ul");
        pedido.servicios.forEach((servicio) => {
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
        fila.appendChild(celdaCancelar);
        tabla.appendChild(fila);
    }
}

obtenerMisPedidos();