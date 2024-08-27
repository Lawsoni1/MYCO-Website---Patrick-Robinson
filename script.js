document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cart = document.getElementById('cart');
    const addToCartButtons = document.querySelectorAll('.add-button');
    const cartItemsList = document.getElementById('cart-items');

    let cartItems = [];

    cartButton.addEventListener('click', () => {
        cart.classList.toggle('active');
        if (cart.classList.contains('active')) {
            cartButton.textContent = 'X';
        } else {
            updateCartButtonText();
        }
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productImage = event.target.previousElementSibling.src;
            addItemToCart(productImage);
            updateCartButtonText();
        });
    });

    function addItemToCart(productImage) {
        const cartItem = document.createElement('li');
        const itemImage = document.createElement('img');
        const removeButton = document.createElement('button');
        
        itemImage.src = productImage;
        itemImage.style.width = '100px';
        itemImage.style.height = '100px';

        removeButton.textContent = 'Remove';
        
        removeButton.addEventListener('click', () => {
            removeItemFromCart(cartItem, productImage);
            updateCartButtonText();
        });

        cartItem.appendChild(itemImage);
        cartItem.appendChild(removeButton);
        cartItemsList.appendChild(cartItem);
        cartItems.push(productImage);
    }

    function removeItemFromCart(cartItem, productImage) {
        cartItemsList.removeChild(cartItem);
        cartItems = cartItems.filter(item => item !== productImage);
    }

    function updateCartButtonText() {
        if (cartItems.length === 0) {
            cartButton.textContent = 'Cart';
        } else if (cartItems.length > 9) {
            cartButton.textContent = 'Cart (9+)';
        } else {
            cartButton.textContent = `Cart (${cartItems.length})`;
        }
    }
});
