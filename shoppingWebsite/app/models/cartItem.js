export class CartItem {
  constructor(item, quantity) {
    this.item = { ...item };
    this.quantity = quantity;
  }

  calcPrice = () => {
    return this.item.price * this.quantity;
  };
}
