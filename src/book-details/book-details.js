$(document).ready(function() {

        function printStars(score, starcontainer) {
                for (let i = 0; i < Math.round(score); i++){
                        const star = document.createElement('i');
                        star.className="fa-solid fa-star";
                        starcontainer.appendChild(star);
                }
                for (let i = 0; i < 5-Math.round(score); i++){
                        const star = document.createElement('i');
                        star.className="fa-solid fa-star";
                        star.style="color: grey";
                        starcontainer.appendChild(star);
                }
        }
    fetch('Librarte/src/booksJson/books.json')
        .then(response => response.json())
        .then(libros => {
            function buscarLibroPorId(id) {
                return libros.find(libro => libro.id === id);
            }

            const book = buscarLibroPorId(4);

            const tittle = book.title;
            const sinopsis = book.sinopsis;
            const score = book.score;
            const nOpinions = book.nReviews;
            const publicationDate = book.publicationDate;
            const price = book.price;
            const num_pag = book.num_pag;
            const language = book.language;
            const isbn = book.isbn;
            const encuadernacion = book.encuadernacion;
            const editorial = book.editorial;
            const cover = book.cover;
            const author_name = book.author_name;
            const alto = book.alto;
            const ancho = book.ancho;
            const grueso = book.grueso;
            const peso = book.peso;

            document.getElementById('tittle').textContent = tittle;
            document.getElementById("tittleSpan").textContent = tittle;
            document.getElementById('cover').src = cover;
            document.getElementById('sinopsisinfo').textContent = sinopsis;
            document.getElementById("editorial").textContent = editorial + " " + isbn;
            document.getElementById("editorial2").textContent = editorial;
            document.getElementById('price').textContent = price + "€";
            document.getElementById('nPages').textContent = num_pag;
            document.getElementById('language').textContent = language;
            document.getElementById('encuadernacion').textContent = encuadernacion;
            document.getElementById('isbn').textContent = isbn;
            document.getElementById('publicationDate').textContent = publicationDate;
            document.getElementById('alto').textContent = alto + " cm";
            document.getElementById('ancho').textContent = ancho + " cm";
            document.getElementById('grueso').textContent = grueso + " cm";
            document.getElementById('peso').textContent = peso + " gr";
            document.getElementById("reviews").textContent = nOpinions + " reviews";
            document.getElementById("puntuation").textContent = score;


            const starcontainer = document.querySelector('.rating');
            printStars(score,starcontainer)
            const starReviews = document.querySelector('#rating-opiniones');
            printStars(score,starReviews)
            const opinions = document.createElement('p');
            opinions.className="nOpiniones";
            opinions.textContent = nOpinions + " opiniones";
            starcontainer.appendChild(opinions);


        })
        .catch(error => console.error('Error al cargar el JSON de libros:', error));

        const reviewcontainer = document.querySelector('.comentarios');
        fetch('Librarte/src/booksJson/reviews.json')
            .then(response => response.json())
            .then(reviews => {
                    reviews.forEach(review => {
                            const cajonComentario = document.createElement('section');
                            cajonComentario.className="cajon-comentario";

                            const profilePicture = document.createElement('img');
                            profilePicture.classList.add('profile-picture');
                            profilePicture.src = review.picture;
                            profilePicture.alt = review.user;

                            const comentario = document.createElement('div');
                            comentario.classList.add('comentario');

                            const username = document.createElement('p');
                            username.classList.add('username');
                            username.textContent = review.user;

                            const rating = document.createElement('div');
                            rating.classList.add('rating');
                            rating.id= "rating-comentarios";

                            const publicationDate = document.createElement('p');
                            publicationDate.classList.add('publicationDateReview');
                            publicationDate.textContent= review.publicationDate;

                            const reviewtext = document.createElement('p');
                            reviewtext.classList.add('review');
                            reviewtext.textContent= review.review;

                            printStars(review.rating,rating)
                            rating.appendChild(publicationDate)
                            comentario.appendChild(username);
                            comentario.appendChild(rating);
                            comentario.appendChild(reviewtext);
                            cajonComentario.appendChild(profilePicture);
                            cajonComentario.appendChild(comentario);

                            reviewcontainer.appendChild(cajonComentario);
                    });
            })
            .catch(error => console.error('Error al cargar el JSON de libros:', error));
});
