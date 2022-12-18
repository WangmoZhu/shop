import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs: AngularFirestore) { }

  getAll(){
    return this.afs.collection('categories', ref => ref.orderBy('name', 'asc')).get()
  }
}
