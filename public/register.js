const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const fnacimiento = document.getElementById("fnacimiento");
const genero = document.getElementById("genero");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");
const mensaje = document.getElementById("mensaje");

btnEnviar.addEventListener("click", async () => {
    if (
        !nombre.value.trim() ||
        !apellido.value.trim() ||
        !fnacimiento.value ||
        !genero.value ||
        !email.value.trim() ||
        !password.value.trim()
    ) {
        mensaje.textContent = "Por favor, completa todos los campos.";
        mensaje.style.color = "red";
        return;
    }
    const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombres: nombre.value,
            apellidos: apellido.value,
            fecha_nacimiento: fnacimiento.value,
            genero: genero.value,
            email: email.value,
            password: password.value
        })
    });

    if (response.ok) {
        mensaje.textContent = "Registro exitoso";
        mensaje.style.color = "green";

        nombre.value = "";
        apellido.value = "";
        fnacimiento.value = "";
        genero.value = "";
        email.value = "";
        password.value = "";

        setTimeout(() => window.location.href = "/login", 2000);
    } else {
        mensaje.textContent = "Error al registrarse.";
        mensaje.style.color = "red";
    }
});