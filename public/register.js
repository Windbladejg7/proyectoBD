const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const fnacimiento = document.getElementById("fnacimiento");
const genero = document.getElementById("genero");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", async() => {
    await fetch("http://localhost:3000/auth/register", {
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
});