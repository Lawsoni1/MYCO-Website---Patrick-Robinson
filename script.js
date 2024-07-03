document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cartButton');
    const cartPopup = document.getElementById('cartPopup');
    const closeCart = document.getElementById('closeCart');

    cartButton.addEventListener('click', () => {
        cartPopup.style.display = 'block';
    });

    closeCart.addEventListener('click', () => {
        cartPopup.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartPopup) {
            cartPopup.style.display = 'none';
        }
    });
});