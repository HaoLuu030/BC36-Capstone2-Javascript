class ProductService {
  productList = [];
  getProduct = () => {
    return axios({
      url: "https://mockapi.io/projects/63661fa279b0914b75c9b90c/products",
      method: "GET",
    });
  };
}
