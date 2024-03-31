function include(tag, file, bookCollection) {
    $(tag).load(file);
}

function fetchBooksOnlyImages(containerID, amount) {

    fetch('Librarte/src/book-collection/book-collection.json')
        .then(response => response.json())
        .then(data => {
            const booksContainer = document.getElementById(containerID);
            console.log(booksContainer)
            for(let i = 0; i < amount; i++) {
                let j = 0
                data.forEach(book => {
                    // Adds only 2 books in last iter
                    if(j === 2 && i === amount - 1) {
                        return;
                    }
                    const bookImage = document.createElement('img');
                    bookImage.src = book.imagen;
                    booksContainer.appendChild(bookImage);
                    j++
                });
            }
        })
        .catch(error => console.error('Error cargando JSON:', error));
}

function includeByQuery(tag, query, file, jsFile) {
    const template = document.querySelector(tag);
    fetch(file)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const parsedHTML = parser.parseFromString(html, 'text/html');
            const content = parsedHTML.querySelector(query);
            template.appendChild(content);
        })
        .catch(error => console.error('Error al cargar el archivo: ', error));

    function loadCSS() {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = file.replace('.html', '.css'); // Suponiendo que el CSS tiene el mismo nombre que la página HTML
        document.head.appendChild(link);
    }
    loadCSS();

    function loadJS() {
        const script = document.createElement('script');
        script.src = jsFile;
        document.head.appendChild(script);
    }
    loadJS();
}

function fetchBooksAllAttributes(containerID) {

    fetch('Librarte/src/book-collection/book-collection.json')
        .then(response => response.json())
        .then(data => {
            const booksContainer = document.getElementById(containerID);
            console.log(booksContainer)
            data.forEach(book => {
                // Crear elementos para mostrar cada libro
                const bookDiv = document.createElement('div');
                const bookTitle = document.createElement('h3');
                const bookAuthor = document.createElement('p');
                const bookPrice = document.createElement('p');
                const bookImage = document.createElement('img');
                const bookPublisher = document.createElement('p');
                const bookISBN = document.createElement('p');
                const bookSynopsis = document.createElement('p');
                const bookScore = document.createElement('p');
                const bookPublicationDate = document.createElement('p');
                const bookPages = document.createElement('p');
                const bookLanguage = document.createElement('p');
                const bookBinding = document.createElement('p');
                const bookEditionYear = document.createElement('p');
                const bookCollection = document.createElement('p');

                // Asignar contenido y atributos
                bookTitle.textContent = book.nombre;
                bookAuthor.textContent = `Autor: ${book.autor}`;
                bookPrice.textContent = `Precio: $${book.precio}`;
                bookImage.src = book.imagen;
                bookImage.alt = `Imagen de ${book.nombre}`;
                bookPublisher.textContent = `Editorial: ${book.editorial}`;
                bookISBN.textContent = `ISBN: ${book.isbn}`;
                bookSynopsis.textContent = `Sinopsis: ${book.sinopsis}`;
                bookScore.textContent = `Score: ${book.score}`;
                bookPublicationDate.textContent = `Fecha de Publicación: ${book.fecha_publicacion}`;
                bookPages.textContent = `Número de Páginas: ${book.numero_paginas}`;
                bookLanguage.textContent = `Idioma: ${book.idioma}`;
                bookBinding.textContent = `Encuadernación: ${book.encuadernacion}`;
                bookEditionYear.textContent = `Año de Edición: ${book.ano_edicion}`;
                bookCollection.textContent = `Colección: ${book.coleccion}`;

                // Agregar elementos al contenedor
                bookDiv.appendChild(bookTitle);
                bookDiv.appendChild(bookAuthor);
                bookDiv.appendChild(bookPrice);
                bookDiv.appendChild(bookImage);
                bookDiv.appendChild(bookPublisher);
                bookDiv.appendChild(bookISBN);
                bookDiv.appendChild(bookSynopsis);
                bookDiv.appendChild(bookScore);
                bookDiv.appendChild(bookPublicationDate);
                bookDiv.appendChild(bookPages);
                bookDiv.appendChild(bookLanguage);
                bookDiv.appendChild(bookBinding);
                bookDiv.appendChild(bookEditionYear);
                bookDiv.appendChild(bookCollection);
                booksContainer.appendChild(bookDiv);

            });
        })
        .catch(error => console.error('Error cargando JSON:', error));
}