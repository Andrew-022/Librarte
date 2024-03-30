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

function includeByQuery(tag, query, file) {
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
}