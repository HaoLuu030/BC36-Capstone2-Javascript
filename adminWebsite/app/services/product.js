export class ProductService {
  getList = () => {
    return axios({
      url: "https://63661fa279b0914b75c9b90b.mockapi.io/products",
      method: "GET",
    });
  };
}
