function include(tag, file) {
    $(tag).load(file);
}
function includeByQuery(tag, query, file) {
    fetch(file)
        .then(response => response.text())
        .then(html => {
            const parser = new DOMParser();
            const parsedHTML = parser.parseFromString(html, 'text/html');
            const content = parsedHTML.querySelector('#' + query);
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