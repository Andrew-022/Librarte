window.addEventListener('resize', function() {
    var width = window.innerWidth;

    if (width < 600) {
        // Acciones para dispositivos pequeños
    } else if (width >= 600 && width < 1024) {
        // Acciones para dispositivos medianos
    } else {
        // Acciones para dispositivos grandes
    }
});

function TabletNavbar() {
    var elementos = document.getElementsByClassName('nombre-de-clase');

// Itera sobre los elementos y borra su contenido
    for (var i = 0; i < elementos.length; i++) {
        elementos[i].innerHTML = '';
    }

}

function MobileNavbar() {

}