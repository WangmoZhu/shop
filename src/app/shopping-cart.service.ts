import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, take } from 'rxjs';
import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private afs: AngularFirestore) { }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.afs.collection('shopping-carts').doc(cartId).collection('items').get()
      .subscribe(querySnap => {
        querySnap.docs.forEach(doc => {
          this.afs.doc('/shopping-carts/' + cartId + '/items/' + doc.id).delete()
        })

        this.afs.collection('shopping-carts').doc(cartId).delete()
      })
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.afs.collection('shopping-carts').doc(cartId).collection('items')
      .valueChanges().pipe(map(items => {
        let newItems = (items as ShoppingCartItem[]).map(item => new ShoppingCartItem(item.product, item.quantity))
        return new ShoppingCart(newItems)
      }));
    //this.afs.doc('/shopping-carts/' + cartId).get()
  }

  private create() {
    return this.afs.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    })
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId
    let result = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private getItem(cartId: string, productId: string) {
    return this.afs.doc('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let doc$ = this.getItem(cartId, product.id as string);
    doc$.get().pipe(take(1)).subscribe(
      doc => {
        if (doc.exists) {
          let quantity = (doc.data() as any).quantity + change;
          if (quantity === 0) doc$.delete();
          doc$.update({ quantity })
        }
        else doc$.set({ product, quantity: 1 })
      }
    )
  }
}
