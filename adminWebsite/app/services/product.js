export class ProductService {
  getList = () => {
    return axios({
      url: "https://63661fa279b0914b75c9b90b.mockapi.io/products",
      method: "GET",
    });
  };

  addProduct = (data) => {
    return axios({
      url: "https://63661fa279b0914b75c9b90b.mockapi.io/products",
      method: "POST",
      data: data,
    });
  };

  deleteProduct = (id) => {
    return axios({
      url: `https://63661fa279b0914b75c9b90b.mockapi.io/products/${id}`,
      method: "DELETE",
    });
  };

  getProductbyId = (id) => {
    return axios({
      url: `https://63661fa279b0914b75c9b90b.mockapi.io/products/${id}`,
      method: "GET",
    });
  };

  updateProduct = (id, data) => {
    return axios({
      url: `https://63661fa279b0914b75c9b90b.mockapi.io/products/${id}`,
      method: "PUT",
      data: data,
    });
  };
}
