export class CartItem {
  constructor(id, item, quantity) {
    this.id = id;
    this.item = { ...item };
    this.quantity = quantity;
  }
}
