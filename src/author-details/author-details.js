$(document).ready(function() {
    fetch("Librarte/src/author-details/author.json")
        .then(response => response.json())
        .then(data => {
            // Acceder a los datos del JSON
            const nombreAutor = data.name;
            const biografiaAutor = data.biography;
            const imagenAutor = data.cover;
            const obrasAutor = data.works;

            // Mostrar la información en la página HTML
            document.getElementById('nombreAutor').textContent = nombreAutor;
            document.getElementById('nombreAutorSpan').textContent = nombreAutor;
            document.getElementById('biografiaAutor').textContent = biografiaAutor;
            document.getElementById('imagenAutor').src = imagenAutor;

            let prueba = [];
            obrasAutor.forEach(obra => {
                prueba.push(obra);
            });
            // Obtén el contenedor de libros
            const librosContainer = document.querySelector('.books');

            // Cargar el JSON de los libros
            fetch('Librarte/src/booksJson/books.json')
                .then(response => response.json())
                .then(libros => {
                    // Filtrar los libros del autor basados en las obras del autor
                    const librosDelAutor = libros.filter(libro => prueba.includes(libro.id));

                    // Crear y agregar dinámicamente los elementos de los libros
                    librosDelAutor.forEach(libro => {
                        const bookPreview = document.createElement('div');
                        bookPreview.classList.add('bookPreview');

                        const bookCover = document.createElement('img');
                        bookCover.classList.add('bookCover');
                        bookCover.src = libro.cover;
                        bookCover.alt = libro.title;

                        const bookinfo = document.createElement('div');
                        bookinfo.classList.add('bookinfo');

                        const bookTitle = document.createElement('b');
                        bookTitle.classList.add('bookInfo');
                        bookTitle.textContent = libro.title;

                        const bookAuthor = document.createElement('p');
                        bookAuthor.classList.add('bookInfo');
                        bookAuthor.textContent = libro.author_name;

                        bookPreview.appendChild(bookCover);
                        bookPreview.appendChild(bookinfo);
                        bookinfo.appendChild(bookTitle);
                        bookinfo.appendChild(bookAuthor);

                        librosContainer.appendChild(bookPreview);
                    });
                })
                .catch(error => console.error('Error al cargar el JSON de libros:', error));
        })
        .catch(error => console.error('Error al cargar el JSON de author:', error));
});
