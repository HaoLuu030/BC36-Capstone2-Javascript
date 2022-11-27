import { ProductService } from "../services/product.js";
import { CartItem } from "../models/cartItem.js";

const productService = new ProductService();
const domId = (id) => {
  return document.getElementById(id);
};

const findIndexbyId = (id) => {
  return cart.findIndex((element) => element.item.id === id);
};

let productList = [];
let cart = [];

//get product list from dtb
const getProductList = () => {
  productService.getList().then((response) => {
    productList = [...response.data];
    renderProductList();
    renderType();g
  });
};
//render product list
const renderProductList = (data = productList) => {
  const html = domId("productGallery");
  const content = data.reduce((total, element) => {
    total += `<div class="col-12 col-sm-6 col-lg-3 px-2">
    <div class="card productGallery__productItem">
      <div class="img-container">
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
  const bodyContent = `<div class="row">
  <div class="col-6">
    <div class="img-container">
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

  const footerContent = `
  <button
  onclick="addToCart('${chosenProduct.id}')"
  type="button"
  class="btn btn-warning"
>
  Thêm vào giỏ <i class="fa fa-shopping-cart"></i>
</button>
<button type="button" class="btn btn-secondary" data-dismiss="modal">
  Đóng
</button>
`;
  domId("details-modal-body").innerHTML = bodyContent;
  domId("details-modal-footer").innerHTML = footerContent;
};
//Add to Cart function
window.addToCart = (id) => {
  const chosenProduct = productList.find((element) => element.id === id);
  const cartItem = new CartItem(chosenProduct, 1);
  // check if the item has already been in the cart
  if (
    cart.find((element) => {
      return element.item.id === id;
    })
  ) {
    const idx = findIndexbyId(id);
    cart[idx].quantity += 1;
  } else {
    cart.push(cartItem);
  }
  setLocalStorage();
  renderQuantity();
  alert("Thêm sản phẩm thành công!");
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
    const data = JSON.parse(stringify);
    //map data to get the method back
    return data.map((element) => {
      return new CartItem(element.item, element.quantity);
    });
  }
};

window.renderCart = () => {
  let bodyContent = "";
  const priceSum = cart.reduce((total, element) => {
    total += element.calcPrice();
    return total;
  }, 0);
  if (cart.length === 0) {
    bodyContent =
      "<span class='emptyCart'>Bạn chưa có sản phẩm nào trong giỏ</span>";
  } else {
    bodyContent = cart.reduce((total, element) => {
      total += `
      <tr class="row align-items-center pb-3 CartItem">
      <td class="col-3">
        <div class="img-container">
          <img
            src="${element.item.img}"
            alt=""
          />
        </div>
      </td>
      <td class="col-2">
        <p>${element.item.name}</p>
      </td>
      <td class="col-2">
        <div class="quantity-modifier">
          <button onclick="decreaseItem('${
            element.item.id
          }')" class="btn-style btn-quantity-modifier">
          <i class="fa-solid fa-minus"></i>
          </button>
          ${element.quantity}
          <button onclick="increaseItem('${
            element.item.id
          }')" class="btn-style btn-quantity-modifier">
          <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </td>
      <td class="col-2">$ ${element.calcPrice()}</td>
      <td class="col-2">
        <button onclick="deleteProduct('${
          element.item.id
        }')" class="btn-deleteProduct">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
      `;
      return total;
    }, "");
  }
  const footerContent = `           
<div class="total">
  <span>Tổng cộng: $ ${priceSum}</span>
</div>

<div class="modal-buttons">
  <button
  onclick="purchase()"
    type="button"
    class="btn btn-success"
  >
    Thanh toán   <i class="fa-solid fa-money-check-dollar"></i>
  </button>
  <button
  onclick="clearCart()"
    type="button"
    class="btn btn-danger"
  >
    Xóa giỏ hàng <i class="fa-solid fa-trash"></i>
  </button>
</div>`;

  domId("cart-modal-body").innerHTML = bodyContent;
  domId("cart-modal-footer").innerHTML = footerContent;
};

window.decreaseItem = (id) => {
  const idx = findIndexbyId(id);
  if (cart[idx].quantity === 1) {
    deleteProduct(id);
  } else {
    cart[idx].quantity -= 1;
  }
  setLocalStorage();
  renderCart();
  renderQuantity();
};

window.increaseItem = (id) => {
  const idx = findIndexbyId(id);
  cart[idx].quantity += 1;
  setLocalStorage();
  renderCart();
  renderQuantity();
};

window.deleteProduct = (id) => {
  const idx = findIndexbyId(id);
  cart.splice(idx, 1);
  setLocalStorage();
  renderCart();
  renderQuantity();
};

window.clearCart = () => {
  if (cart.length === 0) {
    alert("Không có hàng trong giỏ");
  } else {
    cart = [];
    setLocalStorage();
    renderCart();
    renderQuantity();
    alert("Xóa giỏ hàng thành công");
  }
};

window.purchase = () => {
  console.log();
  if (cart.length === 0) {
    alert("Không có hàng trong giỏ");
  } else {
    cart = [];
    setLocalStorage();
    renderCart();
    renderQuantity();
    alert("Thanh toán thành công");
  }
};

const renderType = () => {
  let typeList = [
    ...productList.reduce((total, element) => {
      if (!total.includes(element.type)) {
        total.push(element.type);
      }
      return total;
    }, []),
  ];
  const content = typeList.reduce((total, element) => {
    total += `<option>${element}</option>`;
    return total;
  }, "");

  domId("dropdown-list").innerHTML =
    "<option value='all'>Tất cả</option>".concat(content);
};

domId("dropdown-list").onchange = (event) => {
  const value = event.target.value;
  const selectedProducts = productList.filter((element) => {
    if (element.type === value) {
      return true;
    }

    if (value === "all") {
      return true;
    }
  });

  renderProductList(selectedProducts);
};

window.onload = () => {
  getProductList();
  renderQuantity();
};
