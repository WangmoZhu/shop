import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map, Observable } from 'rxjs';
import { AppUser } from './models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore, private db: AngularFireDatabase) { }

  save(user: firebase.default.User) {

    // this.db.object('/users/' + user.uid).set({
    //   name: user.displayName,
    //   email: user.email
    // })

    const docRef = this.afs.doc('/users/' + user.uid);

    docRef.get().subscribe(doc => {
      if (doc.exists) {
        docRef.update({
          name: user.displayName,
          email: user.email
        })
      } else {
        docRef.set({
          name: user.displayName,
          email: user.email
        })
      }
    })
  }

  get(uid: string): Observable<AppUser>{
    return this.afs.collection('users').doc(uid).get()
      .pipe(map(doc => doc.data() as AppUser));
  }
}
