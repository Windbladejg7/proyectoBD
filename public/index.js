const tabla = document.getElementById("tabla-servicios");
const btnEnviar = document.getElementById("btnEnviar");
const username = document.getElementById("username");
const mensaje = document.getElementById("mensaje");
const menu = document.getElementById("opciones");

async function cargarInforUsuario() {
    try {
        const response = await fetch("/cliente", {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });

        if (!response.ok) {
            username.textContent = "Iniciar Sesión";
            username.parentNode.href = "/login";
            return;
        }
        const optionMenu = document.createElement("a");
        optionMenu.href = "/misPedidos";
        const e = document.createElement("li")
        e.textContent = "Mis pedidos";
        optionMenu.appendChild(e);
        menu.prepend(optionMenu);

        const usuario = await response.json();
        username.textContent = usuario.nombre;
    } catch (error) {
        console.error("Error al cargar la información del usuario:", error);
        username.textContent = "Iniciar Sesión";
        username.parentNode.href = "/login";
    }
}

cargarInforUsuario();

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
    const response = await fetch("/pedidos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ servicios: seleccionados })
    });

    if (response.ok) {
        mensaje.textContent = "✅ Pedido creado exitosamente.";
        mensaje.style.color = "green";
        const checkBox = document.querySelectorAll(".checks");
        checkBox.forEach((c) => {
            c.checked = false;
        });
        const descripciones = document.querySelectorAll(".descripcion");
        descripciones.forEach((d) => d.remove());
        setTimeout(() => mensaje.textContent = "", 2000);
    } else {
        mensaje.textContent = "❌ Hubo un error al crear el pedido.";
        mensaje.style.color = "red";
    }

});

//Para servicios
async function servicios() {
    const response = await fetch("/servicios");
    const datos = await response.json();
    imprimirServicios(datos);
}

function imprimirServicios(datos) {
    datos.forEach((servicio) => {
        const fila = document.createElement("tr");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.value = servicio.id_servicio;
        checkBox.classList.add("checks");

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