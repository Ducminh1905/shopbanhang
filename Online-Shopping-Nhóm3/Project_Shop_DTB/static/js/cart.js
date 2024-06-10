document.addEventListener('DOMContentLoaded', function () {
    const cartButton = document.getElementById('cart-button');
    const cartBox = document.getElementById('cart-box');
    const closeCartButton = document.getElementById('close-cart');
    const deleteAllButton = document.getElementById('delete-all');
    const cartCount = document.getElementById('cart-count');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Initialize cart
    updateCartCount();
    updateCartItems();
    updateTotalPrice();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            const productCard = this.closest('.card');
            const productName = productCard.querySelector('.fw-bolder').textContent;
            const productImage = productCard.getAttribute('data-image');
            const productPrice = parseFloat(productCard.getAttribute('data-price'));
            addToCart(productName, productImage, productPrice);
        });
    });

    cartButton.addEventListener('click', function () {
        cartBox.classList.toggle('show');
    });

    closeCartButton.addEventListener('click', function () {
        cartBox.classList.remove('show');
    });

    deleteAllButton.addEventListener('click', function () {
        cartItems = [];
        updateCartCount();
        updateCartItems();
        updateTotalPrice();
        saveCartToLocalStorage();
    });

    function addToCart(productName, productImage, productPrice) {
        const item = {
            id: cartItems.length,
            name: productName,
            image: productImage,
            price: productPrice
        };
        cartItems.push(item);
        updateCartCount();
        updateCartItems();
        updateTotalPrice();
        saveCartToLocalStorage();
    }

    function removeFromCart(itemId) {
        cartItems = cartItems.filter(item => item.id !== itemId);
        updateCartCount();
        updateCartItems();
        updateTotalPrice();
        saveCartToLocalStorage();
    }

    function updateCartCount() {
        cartCount.textContent = cartItems.length;
    }

    function updateCartItems() {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<img src="${item.image}" class="cart-item-img" alt="${item.name}"><div class="cart-item-details">${item.name}<span class="cart-item-price">$${item.price.toFixed(2)}</span></div><button class="delete-button" data-id="${item.id}">&times;</button>`;
            cartItemsList.appendChild(li);
        });

        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = parseInt(this.getAttribute('data-id'));
                removeFromCart(itemId);
            });
        });
    }

    function updateTotalPrice() {
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        totalPriceElement.textContent = `Tổng:  ₫${total.toFixed(2)}`;
    }

    function saveCartToLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = products.filter(product => 
        product.category.toLowerCase().includes(query) || 
        product.name.toLowerCase().includes(query)
    );
    displayResults(results);
});

function displayResults(results) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No products found</p>';
        return;
    }

    results.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        let productPage;
        switch(product.category) {
            case 'thời trang':
                productPage = 'fashion';
                break;
            case 'điện thoại':
                productPage = 'technology';
                break;
            default:
                productPage = 'product.html';
        }
        resultItem.innerHTML = `
            <a href="${productPage}">
                <img src="${product.image}" alt="${product.name}">
                <p>${product.name}</p>
                <p>Category: ${product.category}</p>
            </a>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

const products = [
    { name: "Áo thun", category: "thời trang", image: "static/img/ao1.jpg" },
    { name: "Áo khoác nam", category: "thời trang", image: "static/img/aokhoac.png" },
    { name: "Quần nam", category: "thời trang", image: "static/img/quan.png" },
    { name: "Áo khoác", category: "thời trang", image: "static/img/aokhoac.png" },
    { name: "Váy công sở", category: "thời trang", image: "static/img/vayy.png" },
    { name: "Apple iPhone 15 ", category: "điện thoại", image: "static/img/iphone.png" },
    { name: "Samsung Galaxy A05 ", category: "điện thoại", image: "static/img/ss.png" },
    { name: ">Redmi Note 13 ", category: "điện thoại", image: "static/img/xi.png" },
    { name: "Pizza", category: "đồ ăn", image: "link_to_image_pizza.jpg" },
    // Add more products as needed
];





