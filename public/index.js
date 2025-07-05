const tabla = document.getElementById("tabla-servicios");
const btnEnviar = document.getElementById("btnEnviar");

//Temporal: necesito guardar el token tras el login
/*async function login() {
    const post = await fetch('http://localhost:3000/auth/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: "luisa@gmail.com", password: "Cristoteama" })
    });
    const loginResponse = post.json();
    return loginResponse;
}*/

//Agregar pedido: funcional
btnEnviar.addEventListener("click", async function () {
    const token = localStorage.getItem("token");
    const seleccionados = [];

    document.querySelectorAll('#tabla-servicios input[type="checkbox"]:checked')
        .forEach(cb => {
            seleccionados.push(Number(cb.value));
        });

    if (seleccionados.length === 0) {
        alert("Selecciona al menos un servicio");
        return;
    }

    console.log(seleccionados);
    await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token //Reemplazar
        },
        body: JSON.stringify({ servicios: seleccionados })
    });
});

//Para servicios
async function servicios() {
    const response = await fetch("http://localhost:3000/servicios");
    const datos = await response.json();
    imprimirServicios(datos);
}

function imprimirServicios(datos) {
    datos.forEach((servicio) => {
        const fila = document.createElement("tr");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.value = servicio.id_servicio;

        checkBox.addEventListener("change", function () {
            if (this.checked) {
                mostrarDescripcion(servicio, fila);
            } else {
                eliminarDescripcion(fila);
            }
        });

        const celdaCheckbox = document.createElement('td');
        celdaCheckbox.appendChild(checkBox);

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = servicio.nombre;

        const celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = servicio.precio;

        fila.appendChild(celdaCheckbox);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaPrecio);

        tabla.appendChild(fila);
    });
}

function mostrarDescripcion(servicio, fila) {
    const elemento = document.createElement("tr");
    elemento.classList.add("descripcion");
    elemento.innerHTML = `<td colspan="3">${servicio.descripcion}</td>`;
    fila.parentNode.insertBefore(elemento, fila.nextSibling);
}

function eliminarDescripcion(fila) {
    const siguiente = fila.nextSibling;
    if (siguiente && siguiente.classList.contains("descripcion")) {
        siguiente.remove();
    }
}

servicios();