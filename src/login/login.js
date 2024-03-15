document.addEventListener("DOMContentLoaded", function() {
    // Obtener el formulario de inicio de sesión
    const formularioInicioSesion = document.getElementById("loginForm");

    // Agregar un evento de envío al formulario de inicio de sesión
    formularioInicioSesion.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener los datos del formulario de inicio de sesión
        const email = document.getElementById("loginmail").value;
        const password = document.getElementById("loginpwd").value;

        // Obtener los datos de usuario almacenados en el almacenamiento local
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Buscar el usuario con el correo electrónico ingresado
        const usuarioEncontrado = usuariosGuardados.find(function(usuario) {
            return usuario.email === email;
        });

        // Verificar si se encontró el usuario y si la contraseña coincide
        if (usuarioEncontrado && usuarioEncontrado.password === password) {
            window.location.href = "Librarte\\src\\home-page\\homepage.html";
        } else {
            // El inicio de sesión falló
            mostrarMensaje("Correo electrónico o contraseña incorrectos");
        }

        function mostrarMensaje(mensaje) {
            var mensajeElemento = document.getElementById("mensajeInicioSesion");
            mensajeElemento.innerHTML = mensaje;
        }


    });
});
