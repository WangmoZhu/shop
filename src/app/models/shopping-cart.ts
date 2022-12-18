import { Product } from "./product";
import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {

  constructor(public items: ShoppingCartItem[]){}

  getQuantity(product: Product){
    let item = this.items.filter((item: any) => item.product.id === product.id)[0];
    return item ? item.quantity : 0;
  }

  get totalPrice(){
    let sum = 0;
    for(let item of this.items){
      sum += item.totalPrice;
    }
    return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for(let item of this.items){
      count += item.quantity;
    }
    return count;
  }
}