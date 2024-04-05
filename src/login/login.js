document.addEventListener("DOMContentLoaded", function() {

    const formularioInicioSesion = document.getElementById("loginForm");

    formularioInicioSesion.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginmail").value;
        const password = document.getElementById("loginpwd").value;

        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const usuario = usuariosGuardados.find(user => user.email === email);

        if (usuario) {
            if (validatePassword(password, usuario.password)) {
                window.location.href = "..\\src\\home-page\\homepage.html";
            } else {
                mostrarMensaje("Contraseña incorrectos");
            }
        } else {
            // Usuario no encontrado
            mostrarMensaje("Usuario no encontrado");
        }
        function mostrarMensaje(mensaje) {
            var mensajeElemento = document.getElementById("mensajeInicioSesion");
            mensajeElemento.innerHTML = mensaje;
        }
    });
    function validatePassword(inputPassword, storedPassword) {
        return btoa(inputPassword) === storedPassword;
    }
});
