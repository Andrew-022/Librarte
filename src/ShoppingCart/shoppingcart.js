$(document).ready(function() {
    fetch("Librarte/src/shoppingcart/shoppingcart.json")
        .then(response => response.json())
        .then(data => {
            var productos = data.productos;

            // Iterar sobre cada producto y agregarlo al carrito
            productos.forEach(function(producto) {
                var item = `
                    <section class="cart-item">
                        <img class="item-image" src="${producto.imagen}">
                        <section class="item-details">
                            <div class="item-details-left">
                                <p class="item-title">${producto.titulo}</p>
                                <p class="item-author">${producto.autor}</p>
                                <p class="item-price">${producto.precio.toFixed(2)}€</p>
                            </div>
                        </section>
                        <i class="fa-solid fa-trash"></i>
                        <div class="item-controls-container">
                            <div class="item-controls">
                                <button class="decrease-button">&#8722;</button>
                                <span class="item-quantity">1</span>
                                <button class="increase-button">&#43;</button>
                            </div>
                        </div>
                    </section>`;
                $(".items-container").append(item);
            });

            // Calcular subtotal
            var subtotal = productos.reduce((total, producto) => total + producto.precio, 0);
            $(".summary-item:nth-child(1) .summary-price").text(subtotal.toFixed(2)+ "€");

            // Calcular total (asumiendo que los gastos de envío son 5€)
            var total = subtotal + 5;
            $(".summary-item.total .summary-price.total-price").text(total.toFixed(2) + "€");
        })
        .catch(error => {
            console.error('Error al obtener el JSON:', error);
        });
});
