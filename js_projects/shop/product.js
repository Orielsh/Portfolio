import { getProductById } from "./server.js"
import {addToCart, isInCart, getCartElement, getCount} from "./cart.js";

'use strict';

const cartItemCount = document.querySelector("#cartItemCount");
const imagePreview = document.querySelector("#imagePreview");
const productImage = document.querySelector("#productImage");
const productInfo = document.querySelector("#productInfo");
const addToCartBtn = document.querySelector("#addToCartBtn");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

addEventListener("DOMContentLoaded", loadPage);
addToCartBtn.addEventListener("click", ()=>{
    addToCart(productId);
});

async function loadPage(){
    refreshAddToCartBtn(productId);
    const product = await getProductById(productId);
    document.title = product.title;
    setProductImages(product);
    setProductInfo(product);
    loadCart();
}

async function setProductImages(product){
    imagePreview.src = product.thumbnail;
    const images = product.images;
    const productOptions = document.createElement("div");
    productOptions.classList.add("product-options", "flex-lg-column");
    for(let image of images){
        const img = document.createElement("img");
        img.src = image;
        img.alt = "Picture";
        img.addEventListener("mouseover",()=>{
            preview(image);
        });
        img.addEventListener("mouseout",()=>{
            preview(product.thumbnail);
        });
        productOptions.appendChild(img);
    }
    productImage.appendChild(productOptions);
}

function preview(imageSrc){
    imagePreview.src = imageSrc;
}

async function setProductInfo(product){
    const h1 = document.createElement("h1");
    h1.textContent = product.title;
    const feedbackPane = document.createElement("div");
    feedbackPane.classList.add("feedback-pane");
    const feedbackAVG = document.createElement("span");
    feedbackAVG.textContent = product.rating;
    feedbackAVG.classList.add("rating-avarage");
    feedbackPane.appendChild(feedbackAVG);
    for(let i=1; i<=5; i++){
        const item = document.createElement("i");
        if(i<product.rating){
            item.classList.add("bi", "bi-star-fill");
        }else if(i===Math.ceil(product.rating)){
            item.classList.add("bi", "bi-star-half");
        }else{
            item.classList.add("bi" ,"bi-star");
        }
        feedbackPane.appendChild(item);
    }
    const i = document.createElement("i");
    i.classList.add("bi" ,"bi-caret-down-fill");
    feedbackPane.appendChild(i);
    const ratingCount = document.createElement("span");
    ratingCount.textContent = Math.trunc(Math.random()*10000) + " ratings";
    ratingCount.classList.add("rating-count");
    feedbackPane.appendChild(ratingCount);
    productInfo.appendChild(h1);
    productInfo.appendChild(feedbackPane);
    const hr = document.createElement("hr");
    productInfo.appendChild(hr);
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = product.description;
    productInfo.appendChild(description);
    const price = document.createElement("span");
    price.textContent = product.price + "$";
    price.classList.add("price");
    productInfo.appendChild(price);
}


function refreshAddToCartBtn(id){
    if(isInCart(id)){
        addToCartBtn.title = "Already in cart"
        addToCartBtn.setAttribute("disabled", "");
    }else{
        addToCartBtn.title = "";
        addToCartBtn.removeAttribute("disabled");
    }
    cartItemCount.textContent = getCount() == 0 ? "" : getCount();
}


async function loadCart(){
    const cartPane = document.querySelector("#cartPane");
    cartPane.addEventListener("cartChagne",()=>refreshAddToCartBtn(productId));
    cartPane.appendChild(await getCartElement());
}
