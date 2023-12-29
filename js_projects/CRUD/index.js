'use strict';

//loader
const loader = document.querySelector('#loader');

//toast

const toast = document.querySelector('#toast');

//container
const container = document.querySelector('#container');

//section element
const updateItemSection = document.querySelector('#updateItemSection');
const addItemSection = document.querySelector('#addItemSection');
const productsListElm = document.querySelector('#products');

//add input element references
const addTitle = document.querySelector('#addTitle');
const addPrice = document.querySelector('#addPrice');

//update input element reference
const updateProductId = document.querySelector('#updateProductId');
const updateProductTitle = document.querySelector('#updateProductTitle');
const updateProductPrice = document.querySelector('#updateProductPrice');

let dummyProductsList;
let tmpProductAdd;

addEventListener("DOMContentLoaded", loadPage);

async function loadPage() {
    await initializeProductsList();
    renderProductsList(dummyProductsList);
}

//store the products locally
async function initializeProductsList() {
    dummyProductsList = await fetchProductsList();
}

async function renderProductsList(productsList) {
    container.style.display = 'none';
    loader.style.display = 'block';
    let content = '';
    for (let i = 0; i < productsList.length; i++) {
        const product = productsList[i];
        content += `<li>
                        <span>${product.id}</span>
                        <span class="product-title clickable" onclick="updateProductById(${product.id})">${product.title}</span>
                        <span>${product.price}$</span>
                        <i class="bi bi-trash3 clickable" onclick="deleteProduct(${product.id}, this)"></i>
                    </li>`
    }
    productsListElm.innerHTML = content;
    loader.style.display = 'none';
    container.style.display = 'block';
}

/* Server functions */

async function fetchProductsList() {
    const response = await fetch('https://dummyjson.com/products', { method: 'GET' });
    const data = await response.json();
    return data.products;
}

async function deleteProduct(id, element) {
    const response = await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (data.isDeleted) {
        dummyProductsList = dummyProductsList.filter((product) => product.id !== data.id)
        element.parentElement.classList.add('removed-row');
        updateItemSection.classList.add('hidden');
        setTimeout(removeElement, 300, element.parentElement);
        toast.classList.add('toast-visible');
        setTimeout(() => {
            toast.classList.remove('toast-visible');
        }, 1000);   //ms
    }
}

function removeElement(element){
    element.parentElement.removeChild(element);
}

async function updateProduct(product) {
    const id = product.id;
    delete product.id; // if not then will get error 404
    const response = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    const data = await response.json();
    return data;
}

async function addProductToServer(product) {
    const response = await fetch('https://dummyjson.com/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });
    const data = await response.json();
    return data;
}

/* DOM functions */

function addProduct() {
    addItemSection.classList.toggle('hidden');
}

function updateProductById(id) {
    const product = getProductById(id);
    const prevId = Number(updateProductId.textContent);
    updateProductId.textContent = product.id;
    updateProductTitle.value = product.title;
    updateProductPrice.value = product.price;
    if(!updateItemSection.classList.contains('hidden') && prevId === id){
        updateItemSection.classList.add('highlight');
        setTimeout(()=>{updateItemSection.classList.remove('highlight')}, 500);
    }
    updateItemSection.classList.remove('hidden');
    window.scrollTo(0, 0);
}

async function saveUpdate(event) {
    event.preventDefault();
    const id = Number(updateProductId.textContent);
    let product = getProductById(id);
    product.title = updateProductTitle.value;
    product.price = parseFloat(updateProductPrice.value);
    try{
        const updatedProduct = await updateProduct(product);
        updateItemSection.classList.add('hidden');
        dummyProductsList[dummyProductsList.indexOf(product)] = updatedProduct;
        renderProductsList(dummyProductsList);
        console.log(product);
        return true;
    }catch(error){
        alert('Error during validation: ' + error.message);
        return false; // Prevent form submission
    }
}

function closeUpdate() {
    updateProductId.textContent = '';
    updateItemSection.classList.add('hidden');
}

function closeAdd() {
    addItemSection.classList.add('hidden');
}

async function saveAdd(event) {
    event.preventDefault();
    tmpProductAdd = {};
    tmpProductAdd.title = addTitle.value;
    tmpProductAdd.price = addPrice.value;
    try{
        const newProduct = await addProductToServer(tmpProductAdd); //always return id=101 bcs it simulate addition
        dummyProductsList.push(newProduct)
        closeAdd();
        renderProductsList(dummyProductsList);
        return true;
    }catch(error){
        alert('Error during validation: ' + error.message);
        return false; // Prevent form submission
    }
}

function getProductById(id){
    const index = dummyProductsList.findIndex((product) => {
        return product.id === id;
    });
    return dummyProductsList[index];
}