'use strict';

const serverUrl = 'https://dummyjson.com/';


//maybe make 2 functions - getAllProducts and getProductsOfCategory..
async function getProducts(category, limit, skip){
    let url;
    if(category === "all")
        url = `${serverUrl}products?limit=${limit}&skip=${skip}`;
    else
        url = `${serverUrl}products/category/${category}?limit=${limit}&skip=${skip}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getCategoryList(){
    const response = await fetch(`${serverUrl}products/categories`);
    const data = await response.json();
    return data;
}
async function getProductById(id){
    const response = await fetch(`${serverUrl}products/${id}`);
    const data = await response.json();
    return data;
}

export {getProducts, getCategoryList, getProductById};