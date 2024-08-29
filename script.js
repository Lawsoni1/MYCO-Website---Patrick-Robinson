// Wait for the DOM content to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const cartButton = document.getElementById('cartButton');
    const cart = document.getElementById('cart');
    const addToCartButtons = document.querySelectorAll('.add-button');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('checkout-button');
    const menuButton = document.querySelector('.menu-button'); 

    // Initialize cart items array and total price
    let cartItems = [];
    let totalPrice = 0;

    // Toggle the menu overlay and change the menu button text
    menuButton.addEventListener('click', function() {
        const overlay = document.getElementById('overlay');
        overlay.classList.toggle('active');
        menuButton.textContent = overlay.classList.contains('active') ? 'X' : 'Menu'; 
    });

    // Toggle the cart visibility and update the cart button text
    cartButton.addEventListener('click', () => {
        cart.classList.toggle('active');
        cartButton.textContent = cart.classList.contains('active') ? 'X' : getCartButtonText();
    });

    // Add event listeners to all 'Add to Cart' buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            // Get product image source and name
            const productImage = event.target.previousElementSibling.src;
            const productName = event.target.getAttribute('data-name');
            // Add item to cart and update button text if necessary
            addItemToCart(productName, productImage);
            if (!cart.classList.contains('active')) {
                cartButton.textContent = getCartButtonText();
            }
        });
    });

    // Function to add an item to the cart
    function addItemToCart(productName, productImage) {
        // Create new elements for the cart item
        const cartItem = document.createElement('li');
        const itemImage = document.createElement('img');
        const itemName = document.createElement('span');
        const itemPrice = document.createElement('span');
        const removeButton = document.createElement('button');
        
        // Set properties for the new cart item elements
        itemImage.src = productImage;
        itemImage.style.width = '150px';
        itemImage.style.height = '150px';

        itemName.textContent = ` ${productName}`;
        itemPrice.textContent = ` - $3.00`;

        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button'); 
        // Add event listener to remove the item from the cart
        removeButton.addEventListener('click', () => {
            removeItemFromCart(cartItem, productImage);
            if (!cart.classList.contains('active')) {
                cartButton.textContent = getCartButtonText();
            }
        });

        // Append elements to the cart item and cart items list
        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemName);
        cartItem.appendChild(itemPrice);
        cartItem.appendChild(removeButton);
        cartItemsList.appendChild(cartItem);
        cartItems.push(productImage);
        updateCartState(3);
    }

    // Function to remove an item from the cart
    function removeItemFromCart(cartItem, productImage) {
        cartItemsList.removeChild(cartItem);
        cartItems = cartItems.filter(item => item !== productImage);
        updateCartState(-3);
    }

    // Function to update the cart's state
    function updateCartState(amount) {
        totalPrice += amount;
        // Update the visibility of cart messages and total price
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

    // Function to get the text for the cart button based on the number of items
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
