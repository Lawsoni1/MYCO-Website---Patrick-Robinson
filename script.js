document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cart = document.getElementById('cart');
    const addToCartButtons = document.querySelectorAll('.add-button');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');

    let cartItems = [];
    let totalPrice = 0;

    cartButton.addEventListener('click', () => {
        cart.classList.toggle('active');
        cartButton.textContent = cart.classList.contains('active') ? 'X' : getCartButtonText();
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productImage = event.target.previousElementSibling.src;
            const productName = event.target.getAttribute('data-name');
            addItemToCart(productName, productImage);
            if (!cart.classList.contains('active')) {
                cartButton.textContent = getCartButtonText();
            }
        });
    });

    function addItemToCart(productName, productImage) {
        const cartItem = document.createElement('li');
        const itemImage = document.createElement('img');
        const itemName = document.createElement('span');
        const itemPrice = document.createElement('span');
        const removeButton = document.createElement('button');
        
        itemImage.src = productImage;
        itemImage.style.width = '150px';
        itemImage.style.height = '150px';

        itemName.textContent = ` ${productName}`;
        itemPrice.textContent = ` - $3.00`;

        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button'); // Add this line to style the remove button
        removeButton.addEventListener('click', () => {
            removeItemFromCart(cartItem, productImage);
            if (!cart.classList.contains('active')) {
                cartButton.textContent = getCartButtonText();
            }
        });

        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(removeButton);
        cartItemsList.appendChild(cartItem);
        cartItems.push(productImage);
        updateCartState(3);
    }

    function removeItemFromCart(cartItem, productImage) {
        cartItemsList.removeChild(cartItem);
        cartItems = cartItems.filter(item => item !== productImage);
        updateCartState(-3);
    }

    function updateCartState(amount) {
        totalPrice += amount;
        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            totalPriceElement.style.display = 'none';
            checkoutButton.style.display = 'none';
        } else {
            emptyCartMessage.style.display = 'none';
            totalPriceElement.style.display = 'block';
            totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
            checkoutButton.style.display = 'block';
        }
    }

    function getCartButtonText() {
        if (cartItems.length === 0) {
            return 'Cart';
        } else if (cartItems.length > 9) {
            return 'Cart (9+)';
        } else {
            return `Cart (${cartItems.length})`;
        }
    }
});
