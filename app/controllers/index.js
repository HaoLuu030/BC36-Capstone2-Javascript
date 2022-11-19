import { ProductService } from "../services/product.js";
import { Product } from "../models/product.js";
import { CartItem } from "../models/cartItem.js";

const productService = new ProductService();
const domId = (id) => {
  return document.getElementById(id);
};

let productList = [];
let cart = [];
//get product list from dtb
const getProductList = () => {
  productService.getList().then((response) => {
    productList = [...response.data];
    renderProductList(response.data);
  });
};
//render product list
const renderProductList = (data) => {
  const html = domId("productGallery");
  const content = data.reduce((total, element) => {
    total += `<div class="col-12 col-sm-6 col-lg-3 px-2">
    <div class="card productGallery__productItem">
      <div class="productGallery__img-container">
        <img
          src="${element.img}"
          class="card-img-top"
          alt="..."
        />
      </div>
      <div class="card-body productGallery__productContent">
            <a href="#" class="productGallery__productName">
              <h5 class="card-title">${element.name}</h5></a
            >
        <div class="five-stars">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </div>
        <p class="card-text productGallery__productPrice">$ ${element.price}</p>
      </div>
      <div class="productGallery__mini-menu">
        <button onclick="this.classList.toggle('like')" class="btn-style">
          <i class="fa-solid fa-heart"></i>
        </button>
        <button type="button" data-toggle="modal" data-target="#productDetails" onclick="openInfoModal('${element.id}')" class="btn-style">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button onclick="addToCart('${element.id}')" class="btn-style">
          <i class="fa fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  </div>`;
    return total;
  }, "");
  html.innerHTML = content;
};
// Show product detail function
window.openInfoModal = (id) => {
  const chosenProduct = productList.find((element) => element.id === id);
  const content = `<div class="row">
  <div class="col-6">
    <div class="modal-image-container">
      <img
        src="${chosenProduct.img}"
        alt=""
      />
    </div>
    <div class="five-stars">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
  </div>
  <div class="col-6">
    <div class="modal-extraInformation">
      <h1>${chosenProduct.name}</h1>
      <ul class="specifications pb-3">
        <li>${chosenProduct.desc}</li>
        <li>Màn hình: ${chosenProduct.screen}</li>
        <li>Camera Sau: ${chosenProduct.backCamera}</li>
        <li>Camera Trước: ${chosenProduct.frontCamera} 7 MP</li>
      </ul>
      <div class="row align-items-center">
        <div class="col-7"><h2>$ ${chosenProduct.price}</h2></div>
        <div class="col5">
          <span id="inStock">Còn hàng</span>
        </div>
      </div>
    </div>
  </div>
</div>`;
  domId("details-modal-body").innerHTML = content;
};
//Add to Cart function
window.addToCart = (id) => {
  const chosenProduct = productList.find((element) => element.id === id);
  const cartItem = new CartItem(id, chosenProduct, 1);
  // check if the item has already been in the cart
  if (cart.find((element) => element.id === id)) {
    const idx = cart.findIndex((element) => element.id === id);
    cart[idx].quantity += 1;
  } else {
    cart.push(cartItem);
  }
  setLocalStorage();
  renderQuantity();
};

const renderQuantity = () => {
  cart = getLocalStorage();
  //calculate the total quantity
  const sumQuantity = cart.reduce((total, element) => {
    return (total += element.quantity);
  }, 0);
  //show the total quantity
  domId("quantity").innerHTML = sumQuantity;
};

const setLocalStorage = () => {
  const stringify = JSON.stringify(cart);
  localStorage.setItem("CART_LIST", stringify);
};

const getLocalStorage = () => {
  const stringify = localStorage.getItem("CART_LIST");
  if (stringify) {
    return JSON.parse(stringify);
  }
};

window.onload = () => {
  getProductList();
  renderQuantity();
};
