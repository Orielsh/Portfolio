import { getProducts, getCategoryList } from "./server.js";
import { getCartElement, getCount} from "./cart.js";

'use strict';

const toggleCategoryListBtnElm = document.querySelector("#toggleCategoryListBtn");
const categoryListWrapperElm = document.querySelector("#categoryListWrapper");
const toggleCategoryListBtnIcon = document.querySelector("#toggleCategoryListBtnIcon");
const productListElm = document.querySelector("#productList");
const paginationElm = document.querySelector("#pagination");
const cartItemCount = document.querySelector("#cartItemCount");


let categoryList;
let productList;
let numberOfProductsInServer;   //need for calculation of the pagination page count
const productsInPage = 10;

toggleCategoryListBtnElm.addEventListener(
    "click", ()=>{
        categoryListWrapperElm.classList.toggle("hidden");
        toggleCategoryListBtnIcon.classList.toggle("rotate-180");
    }
);

addEventListener('DOMContentLoaded', loadPage);

async function loadPage(){
    categoryList = await getCategoryList();
    categoryList.sort();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let category = urlParams.get("category") ?? "all";
    let currentPageNumber = Number(urlParams.get("skip") ?? "1");
    let productListRaw = await getProducts(category, productsInPage, (currentPageNumber-1)*productsInPage);
    numberOfProductsInServer = Number(productListRaw.total);
    productList = productListRaw.products;
    buildCategoriesPane();
    buildProductsPane(productList);
    buildPagination()
    loadCart();
}

async function buildCategoriesPane(){
    const categoryListElm = document.createElement("ul");
    categoryListElm.classList.add("category-list");
    for(let category of categoryList){
        const liElm = document.createElement("li");
        const aElm = document.createElement("a");
        aElm.textContent = category
        aElm.href = `./index.html?category=${category}`;
        liElm.appendChild(aElm);
        categoryListElm.appendChild(liElm);
    }
    categoryListWrapperElm.appendChild(categoryListElm);
}

function buildProductsPane(productList){
    const ul = document.createElement("ul");
    for(let product of productList){
        const li = buildProductElement(product);
        ul.appendChild(li);
    }
    productListElm.appendChild(ul);
}

function buildProductElement(product){
    const li = document.createElement("li");
    const link = document.createElement("a");
    const imageWrapper = document.createElement("div");
    const image = document.createElement("img");
    const h4 = document.createElement("h4");
    const p = document.createElement("p");
    p.textContent = product.description;
    const span = document.createElement("span");
    span.textContent = `${product.price}$`;
    imageWrapper.classList.add("thumbnail-wrapper");
    image.src = product.thumbnail;
    h4.textContent = product.title;
    image.classList.add("thumbnail");
    link.title = product.title;
    link.href = `./product.html?id=${product.id}`;
    imageWrapper.appendChild(image);
    link.appendChild(imageWrapper);
    link.appendChild(h4);
    link.appendChild(p);
    link.appendChild(span);
    li.appendChild(link);
    return li;
}

function buildPagination(activePage){
    const numberOfPages = Math.ceil(numberOfProductsInServer/productsInPage);
    const tmpURL = new URL(window.location.href);
    const urlPageParam = tmpURL.searchParams.get("skip") ?? "1";
    let currentPageNumber = Number(urlPageParam);
    const ul = document.createElement("ul");
    ul.classList.add("pagination", "justify-content-center", "flex", "flex-wrap")
    tmpURL.searchParams.set("skip", currentPageNumber - 1);
    ul.appendChild(buildPageElement("Previous", tmpURL.href, currentPageNumber === 1));
    for(let i=1; i <= numberOfPages; i++){
        tmpURL.searchParams.set("skip", i);
        ul.appendChild(buildPageElement(i, tmpURL,  false, i === currentPageNumber));
    }
    tmpURL.searchParams.set("skip", currentPageNumber + 1);
    ul.appendChild(buildPageElement("Next", tmpURL.href, currentPageNumber === numberOfPages));
    paginationElm.appendChild(ul);
}

function buildPageElement(text, link, disabled=false, active=false){
    const li = document.createElement("li");
    li.classList.add("page-item");
    const a = document.createElement("a");
    a.classList.add("page-link");
    a.textContent = text;
    a.href = link;
    if(disabled)
        li.classList.add("disabled");
    if(active)
        li.classList.add("active");
    li.appendChild(a);
    return li;
}

const cartPane = document.querySelector("#cartPane");
cartPane.addEventListener("cartChagne",refreshCounter);
function refreshCounter(){
    cartItemCount.textContent = getCount() == 0 ? "" : getCount();
}
async function loadCart(){
    cartPane.appendChild(await getCartElement());
    refreshCounter();
}