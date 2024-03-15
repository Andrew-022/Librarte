document.addEventListener("DOMContentLoaded", function() {
    // Selecciona el formulario por su ID
    const formulario = document.getElementById("registerForm");

    // Agrega un evento de envío al formulario
    formulario.addEventListener("submit", function(event) {
        // Evita que el formulario se envíe de forma predeterminada
        event.preventDefault();

        // Captura los valores del formulario
        const name = document.getElementById("name").value;
        const last_name = document.getElementById("last_name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Crea un objeto JavaScript con los valores capturados
        const usuario = {
            name: name,
            last_name: last_name,
            email: email,
            password: password
        };

        // Obtener los datos de usuario almacenados en el almacenamiento local (si hay alguno)
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Agregar el nuevo usuario a la lista de usuarios
        usuariosGuardados.push(usuario);

        // Guardar la lista actualizada de usuarios en el almacenamiento local
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        // Limpia el formulario después de enviar
        formulario.reset();
    });
});
