const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnIngresar = document.getElementById("btnIngresar");
const error = document.getElementById("textoError");

btnIngresar.addEventListener("click", async () => {
    const response = await fetch("http://localhost:3000/auth/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: txtEmail.value.trim(), password: txtPassword.value.trim() })
    });
    const datos = await response.json();
    if (response.ok) {
        localStorage.setItem("token", datos.token);
        window.location.href = "/verPedidos";
    } else {
        error.textContent = datos.error;
        error.style.color = "red";
    }
});