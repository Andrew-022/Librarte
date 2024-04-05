$(document).ready(function() {
    fetch("../src/search/search.json")
        .then(response => response.json())
        .then(data => {
            const libros = data.libros;

            libros.forEach(function(libro) {
                const bookPreview = `
                    <div class="bookPreview">
                        <img class="bookCover" src="${libro.imagen}" alt="${libro.titulo}">
                        <b class="bookTitle">${libro.titulo}</b>
                        <p class="bookAuthor">${libro.autor}</p>
                        <p class="bookPrice">$${libro.precio.toFixed(2)}</p>
                    </div>`;
                $(".books").append(bookPreview);
            });
        })
        .catch(error => {
            console.error('Error al obtener el JSON:', error);
        });
});
