const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnIngresar = document.getElementById("btnIngresar");

btnIngresar.addEventListener("click", async ()=>{
    const response = await fetch("http://localhost:3000/auth/login", {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email:txtEmail.value.trim(), password:txtPassword.value.trim()})
    });
    const token = await response.json();
    console.log(token);
    localStorage.setItem("token", token.token);
    console.log(localStorage.getItem("token"));
});