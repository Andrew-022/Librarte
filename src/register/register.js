document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById("registerForm");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const last_name = document.getElementById("last_name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const encryptedPassword = encryptPassword(password);


        const usuario = {
            name: name,
            last_name: last_name,
            email: email,
            password: encryptedPassword
        };


        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        usuariosGuardados.push(usuario);

        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        formulario.reset();
    });
    function encryptPassword(password) {
        return btoa(password);
    }
});
