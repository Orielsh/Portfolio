import { getProductById, getProducts } from "./server.js";

/*this is not how real cart should be implemented since it't not a good practice
    to load all products to the local memory.
    But there is no option to edit DummyJson cart and I wanted to practice some localstorage,
    I choosed to do this in this way. 
    It also possible to iterate over cart id's array and fetch each one
    but it will overload dummyjson server and we might get error of too many requests and mainly it not efficient.
*/


const body = document.createElement("div");
body.classList.add("offcanvas-body");
function buildCartContent(products){
    for(let product of products){
        body.appendChild(buildItemCard(product));
    }
    return body;
}

function buildItemCard(product){
    const div = document.createElement("div");
    const img = document.createElement("img");
    const a = document.createElement("a");
    const h5 = document.createElement("h5");
    const p = document.createElement("p");
    const spanWrap = document.createElement("span");
    const spanPrice = document.createElement("span");
    const i = document.createElement("i");

    spanPrice.textContent = `${product.price}$`
    spanPrice.classList.add("fw-bold");
    i.classList.add("bi", "bi-trash");
    i.addEventListener("click", ()=>{
        div.remove();
        removeFromCart(product.id);
    });

    spanWrap.appendChild(spanPrice);
    spanWrap.appendChild(i);
    spanWrap.classList.add("d-flex", "justify-content-between");
    
    p.textContent = product.description;
    h5.textContent = product.title;
    h5.classList.add("fw-bold");
    img.src = product.thumbnail;
    img.classList.add("img-fluid");
    a.appendChild(img);
    a.href = `./product.html?id=${product.id}`;
    div.classList.add("cart-item");

    div.appendChild(a);
    div.appendChild(h5);
    div.appendChild(p);
    div.appendChild(spanWrap);
    return div;
}

async function getCartElement(){
    const productsRaw = await getProducts("all", 0, 0);
    const products = productsRaw.products;
    const filteredProducts = products.filter( (product)=> isInCart( `${product.id}`) );
    return buildCartContent(filteredProducts);
}

async function addToCart(id){
    const cartArr = JSON.parse(window.localStorage.getItem("cart")) ?? [];
    if(!isInCart(id)){//item can only appear once - no support for quantity.
        cartArr.push(id);
        window.localStorage.setItem("cart", JSON.stringify(cartArr));
        body.appendChild(buildItemCard(await getProductById(id)));
        const event = new CustomEvent('cartChagne');
        cartPane.dispatchEvent(event);
    }
}

function removeFromCart(id){
    let cartArr = JSON.parse(window.localStorage.getItem("cart")) ?? [];
    cartArr = cartArr.filter((element) => element !== `${id}`);
    window.localStorage.setItem("cart", JSON.stringify(cartArr));
    const event = new CustomEvent('cartChagne');
    cartPane.dispatchEvent(event);
}

function isInCart(id){
    const cartArr = JSON.parse(window.localStorage.getItem("cart")) ?? [];
    return cartArr.includes(id);
}

function getCount(){
    const arr = JSON.parse(window.localStorage.getItem("cart")) ?? [];
    return arr.length;
}
export {getCartElement, addToCart, removeFromCart, isInCart, getCount};