document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('productForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('productName').value;
            const price = document.getElementById('productPrice').value;
            const quantity = document.getElementById('productQuantity').value;
            const description = document.getElementById('productDescription').value;

            const product = { name, price, quantity, description, id: Date.now() };
            saveProduct(product);
            form.reset();
            alert('Producto registrado Correctamente!');
        });
    }

    loadProducts();
});

function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function loadProducts() {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const table = document.getElementById('productTable');
    if (table) {
        const tbody = table.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        products.forEach(product => addProductToTable(product, tbody));
    }
}

function addProductToTable(product, tbody) {
    const row = tbody.insertRow();
    row.innerHTML = `
        <td>${product.name}</td>
        <td>$${parseFloat(product.price).toFixed(2)}</td>
        <td>${product.quantity}</td>
        <td>${product.description}</td>
        <td><button onclick="deleteProduct(${product.id})">Delete</button></td>
    `;
}

function showProducts() {
    const container = document.getElementById('productTableContainer');
    if (container) {
        container.style.display = 'block';
        loadProducts();
    }
}

function deleteProduct(id) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    loadProducts();
}