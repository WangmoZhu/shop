import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) { }

  create(product: any) {
    return this.afs.collection('products').add(product)
  }

  getAll() {
    return this.afs.collection('products').get()
  }

  get(productId: string) {
    return this.afs.doc('/products/' + productId).get()
  }

  update(productId: string, product: any) {
    return this.afs.doc('/products/' + productId).update(product)
  }

  delete(productId: string) {
    return this.afs.doc('/products/' + productId).delete()
  }
}
