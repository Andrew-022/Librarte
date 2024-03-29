$(document).ready(function() {
    const librosContainer = document.querySelector('.books');
    fetch('Librarte/src/booksJson/books.json')
        .then(response => response.json())
        .then(libros => {

            libros.forEach(libro => {

                const bookPreview = document.createElement('div');
                bookPreview.classList.add('bookPreview');

                const bookCover = document.createElement('img');
                bookCover.classList.add('bookCover');
                bookCover.src = libro.cover;
                bookCover.alt = libro.title;
                
                const bookTitle = document.createElement('b');
                bookTitle.classList.add('bookTitle');
                bookTitle.textContent = libro.title;

                const bookAuthor = document.createElement('p');
                bookAuthor.classList.add('bookAuthor');
                bookAuthor.textContent = libro.author_name;

                const bookPrice = document.createElement('p');
                bookPrice.classList.add('bookPrice');
                bookPrice.textContent = libro.price + "€";

                bookPreview.appendChild(bookCover);
                bookPreview.appendChild(bookTitle);
                bookPreview.appendChild(bookAuthor);
                bookPreview.appendChild(bookPrice);

                librosContainer.appendChild(bookPreview);
            });
        })
        .catch(error => console.error('Error al cargar el JSON de libros:', error));
});
