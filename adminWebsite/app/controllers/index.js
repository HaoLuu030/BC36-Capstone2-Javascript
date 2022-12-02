import { ProductService } from "../services/product.js";
import { Product } from "../models/product.js";
//Changed all the var declaration into let or const declaration
let productList = [];
// Created new service to the product list
const productService = new ProductService();

// Added resusable function for cleaner code
const domId = (id) => document.getElementById(id);

//get the list from database

const getProductList = () => {
  productService.getList().then((response) => {
    productList = [...response.data];
    renderProductList(productList);
    renderType("Tất cả", "filter-list");
  });
};

//Change variable name "item" into "product"
domId("addBtn").onclick = () => {
  domId("QL").reset();
  domId("id").disabled = false;
  domId("modalTitle").innerHTML = "Thêm sản phẩm";
  domId("modal-footer").innerHTML = `
  <button type="button" class="btn btn-secondary close-btn" data-dismiss="modal">Đóng</button>
  <button type="button" class="btn btn-success" onclick="addProduct()">Thêm</button></button>`;
  renderType("Chọn loại", "type");
};

const getFormValue = () => {
  const formValue = {
    id: domId("id").value,
    name: domId("name").value,
    price: domId("price").value,
    screen: domId("screen").value,
    backCamera: domId("backCamera").value,
    frontCamera: domId("frontCamera").value,
    img: domId("img").value,
    desc: domId("desc").value,
    type: domId("type").value,
  };

  return formValue;
};
const validateForm = () => {
  const formValue = getFormValue();
  const { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    formValue;
  let isValid = true;
  isValid &= required(id, "spanId") && validateId(id, "spanId");
  isValid &=
    required(name, "spanName") && validateProductName(name, "spanName");
  isValid &= required(price, "spanPrice") && validatePrice(price, "spanPrice");
  console.log(isValid);

  isValid &= required(img, "spanImg") && validateImgInput(img, "spanImg");

  isValid &=
    required(screen, "spanScreen") && validateScreenType(screen, "spanScreen");

  isValid &= required(backCamera, "spanBackCamera");

  isValid &= required(frontCamera, "spanFrontCamera");

  isValid &= required(desc, "spanDescription");
  isValid &= validateProductType(type, "spanType");

  return isValid;
};

window.addProduct = () => {
  const isValid = validateForm();
  if (!isValid) {
    return;
  }
  const id = domId("id").value;
  //check if the product has already existed in the list
  const hasExisted = productList.find((element) => element.id === id);
  console.log(hasExisted);

  if (hasExisted) {
    alert("Id bị trùng lặp");
    return;
  }
  //destructuring
  const values = getFormValue();
  const { name, price, screen, backCamera, frontCamera, img, desc, type } =
    values;

  let product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  productService.addProduct(product);
  alert("Thêm sản phẩm thành công");
  domId("QL").reset;
  getProductList();
};

function renderProductList(data = productList) {
  //changed "for" loop to higher order function for cleaner code
  let html = data.reduce((total, element) => {
    total += `
    <tr>
      <td class="tb-cell">${element.id}</td>
      <td class="tb-cell">${element.name}</td>
      <td class="tb-cell">$ ${element.price}</td>
      <td class="tb-cell">
       - Màn hình: ${element.screen} <br>
       - Camera trước: ${element.frontCamera} <br>
       - Camera sau: ${element.backCamera}
      </td>
      <td class="tb-cell center-align">
      <a href="${element.img}" target="_blank">Link</a>
      </td>
      <td class="tb-cell center-align">
      <button onclick="getUpdateForm('${element.id}')" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
      <i class="fa fa-pencil-alt"></i>
      </button>
      <button onclick="deleteProduct('${element.id}')" class="btn btn-danger"><i class="fa fa-trash-alt"></i></button>
      </td>
    </tr>`;

    return total;
  }, "");

  domId("tableDanhSach").innerHTML = html;
}

window.deleteProduct = (id) => {
  productService.deleteProduct(id);
  alert("Xóa sản phẩm thành công");
  getProductList();
};

window.getUpdateForm = (id) => {
  domId("modalTitle").innerHTML = "Cập nhật sản phẩm";

  domId("modal-footer").innerHTML = `
  <button type="button" class="btn btn-secondary close-btn" data-dismiss="modal">Đóng</button>
  <button type="button" class="btn btn-primary" onclick="updateProduct()">Cập nhật</button></button>`;
  domId("id").disabled = true; // nguoi dung khong sua dc id

  renderType(0, "type");

  productService.getProductbyId(id).then((response) => {
    const selectedProduct = response.data;
    console.log(selectedProduct);
    domId("id").value = selectedProduct.id;
    domId("name").value = selectedProduct.name;
    domId("price").value = selectedProduct.price;
    domId("screen").value = selectedProduct.screen;
    domId("backCamera").value = selectedProduct.backCamera;
    domId("frontCamera").value = selectedProduct.frontCamera;
    domId("img").value = selectedProduct.img;
    domId("desc").value = selectedProduct.desc;
    domId("type").value = selectedProduct.type;
  });
};

window.updateProduct = () => {
  const values = getFormValue();

  const { id, name, price, screen, backCamera, frontCamera, img, desc, type } =
    values;

  let product = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  productService.updateProduct(id, product).then(() => {
    document.querySelector(".close-btn").click();
    alert("Cập nhật thành công");
    domId("QL").reset(); // reset form
    domId("id").disabled = false;
    getProductList();
  });
};

window.searchItem = () => {
  const result = [];
  const keyword = domId("searchName").value;

  const idRegex = /\d+/;
  const nameRegex = /^[A-Za-z]/;

  for (let i in productList) {
    const id = productList[i].id;
    const name = productList[i].name;
    if (idRegex.test(keyword) && id.includes(keyword)) {
      result.push(productList[i]);
    } else if (
      nameRegex.test(keyword) &&
      name.toLowerCase().includes(keyword.toLowerCase())
    ) {
      result.push(productList[i]);
    }
  }

  if (result.length === 0) {
    alert("Không tìm thấy sản phẩm phù hợp");
    return;
  }

  renderProductList(result);
};

const renderType = (title = 0, target) => {
  let typeList = [
    ...productList.reduce((total, element) => {
      if (!total.includes(element.type)) {
        total.push(element.type);
      }
      return total;
    }, []),
  ];
  const content = typeList.reduce((total, element) => {
    total += `<option value="${element}">${element}</option>`;
    return total;
  }, "");

  if (title) {
    domId(target).innerHTML = `<option value='0'>${title}</option>`.concat(
      content
    );
  } else {
    domId(target).innerHTML = content;
  }
};

domId("filter-list").onchange = (event) => {
  const value = event.target.value;
  const selectedProducts = productList.filter((element) => {
    if (element.type === value) {
      return true;
    }

    if (value == 0) {
      return true;
    }
  });

  renderProductList(selectedProducts);
};

//validate stuff

const required = (value, spanId) => {
  if (value.length === 0) {
    domId(spanId).innerHTML = "*Trường này không được bỏ trống";
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
};

const validateId = (value, spanId) => {
  const idRegex = /^\d*$/;
  if (idRegex.test(value)) {
    domId(spanId).innerHTML = "";
    return true;
  }
  domId(spanId).innerHTML = "*Id chỉ được chứa các ký tự số";
  return false;
};

const validateProductName = (value, spanId) => {
  const nameRegex = /^\w{1}[A-Za-z0-9 ]*$/;
  if (!nameRegex.test(value)) {
    domId(spanId).innerHTML =
      "*Tên sản phẩm phải bắt đầu bằng một chữ cái và không được chứa các ký tự đặc biệt";
    return false;
  } else if (value.length < 8) {
    domId(spanId).innerHTML = "* Tên sản phẩm phải chứa ít nhất 8 ký tự";
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
};

const validatePrice = (value, spanId) => {
  const priceRegex = /^\d*$/;
  if (!priceRegex.test(value)) {
    domId(spanId).innerHTML = "* Giá chỉ được nhập số";
    return false;
  } else if (value * 1 < 500 || value * 1 > 10000) {
    domId(spanId).innerHTML =
      "* Giá chỉ được nằm trong khoảng từ $500 đến $1000";
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
};

const validateImgInput = (value, spanId) => {
  const imgRegex = /.*(.jpg||.jpeg||.png||>gif)$/i;
  if (!imgRegex.test(value)) {
    domId(spanId).innerHTML =
      "link hình ảnh phải nhập định dạng (jpg, jpeg, png hay gif)";
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
};

const validateScreenType = (value, spanId) => {
  const screenRegex = /screen \d+/i;
  if (!screenRegex.test(value)) {
    domId(spanId).innerHTML =
      "Định dạng màn hình đúng: screen + [một số bất kỳ] (screen 57)";
    return false;
  }
  domId(spanId).innerHTML = "";
  return true;
};

const validateProductType = (value, spanId) => {
  if (value == 0) {
    domId(spanId).innerHTML = "*Vui lòng chọn loại cho sản phẩm";
    return false;
  }
  console.log(1);

  domId(spanId).innerHTML = "";
  return true;
};

window.onload = () => {
  getProductList();
};
