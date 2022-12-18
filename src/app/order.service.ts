import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from './models/order';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore, private cartService: ShoppingCartService) { }

  async placeOrder(order: Order) {
    let result = await this.afs.collection('orders').add({...order})
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.afs.collection('orders').valueChanges();
  }

  getOrdersByUser(userId: string){
    return this.afs.collection('orders', ref => ref.where('userId', '==', userId)).valueChanges();
  }
}
