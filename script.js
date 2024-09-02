document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cart = document.getElementById('cart');
    const addToCartButtons = document.querySelectorAll('.add-button');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');
    const menuButton = document.querySelector('.menu-button');
    const overlay = document.getElementById('overlay');

    let cartItems = [];
    let totalPrice = 0;

    // Toggle the menu overlay and change the menu button text
    menuButton.addEventListener('click', () => {
        const isActive = overlay.classList.toggle('active');
        menuButton.textContent = isActive ? 'X' : 'Menu';
    });

    // Toggle the cart visibility and update the cart button text
    cartButton.addEventListener('click', () => {
        toggleCartVisibility();
    });

    // Close the cart when clicking outside of it
    document.addEventListener('click', (event) => {
        if (!cart.contains(event.target) && !cartButton.contains(event.target)) {
            closeCart();
        }
    });

    // Automatically close the cart and overlay if window size is under 800px
    window.addEventListener('resize', () => {
        if (window.innerWidth < 800) {
            closeCart();
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                menuButton.textContent = 'Menu';
            }
        } else {
            // Ensure the overlay is removed if the window size is greater than or equal to 800px
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
                menuButton.textContent = 'Menu';
            }
        }
    });

    // Add event listeners to all 'Add to Cart' buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productImage = event.target.previousElementSibling.src;
            const productName = event.target.getAttribute('data-name');
            addItemToCart(productName, productImage);
            updateCartButtonText();
        });
    });

    function toggleCartVisibility() {
        const isActive = cart.classList.toggle('active');
        cartButton.textContent = isActive ? 'X' : getCartButtonText();
    }

    function closeCart() {
        cart.classList.remove('active');
        updateCartButtonText();
    }

    function addItemToCart(productName, productImage) {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${productImage}" style="width: 150px; height: 150px;">
            <span>${productName}</span>
            <span>- $3.00</span>
            <button class="remove-button">Remove</button>
        `;

        const removeButton = cartItem.querySelector('.remove-button');
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            removeItemFromCart(cartItem, productImage);
        });

        cartItem.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        });

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

        // Update total price and checkout button visibility
        if (totalPrice <= 0) {
            totalPrice = 0;
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
        return cartItems.length === 0 ? 'Cart' : `Cart (${cartItems.length > 9 ? '9+' : cartItems.length})`;
    }

    function updateCartButtonText() {
        if (!cart.classList.contains('active')) {
            cartButton.textContent = getCartButtonText();
        }
    }
});
