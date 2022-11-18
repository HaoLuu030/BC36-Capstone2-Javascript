const productService = new ProductService();

const domId = (id) => {
  return document.getElementById(id);
};

const getProductList = () => {
  productService.getList().then((response) => {
    renderProductList(response.data);
  });
};

const renderProductList = (data) => {
  const html = domId("productGallery");
  const content = data.reduce((total, element) => {
    total += `<div class="col-12 col-md-6 col-lg-3">
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
        <button type="button" data-toggle="modal" data-target="#productDetails" onclick="viewInfo()" class="btn-style">
          <i class="fa-solid fa-eye"></i>
        </button>
        <button onclick="addToCart()" class="btn-style">
          <i class="fa fa-shopping-cart"></i>
        </button>
      </div>
    </div>
  </div>`;
    return total;
  }, "");
  html.innerHTML = content;
};

window.onload = () => {
  getProductList();
};
