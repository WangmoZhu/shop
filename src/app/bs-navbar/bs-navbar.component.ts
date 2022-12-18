import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  user$!: Observable<firebase.default.User | null>
  appUser!: AppUser;
  cart$!: Observable<ShoppingCart>

  constructor(
    private cartService: ShoppingCartService,
    protected auth: AuthService
  ) {
  }

  async ngOnInit() {
    // this.afAuth.user.subscribe(x => console.log(x))
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser)
    this.cart$ = await this.cartService.getCart()
    // cart$.valueChanges().subscribe((cart: any) => {
    //   console.log(cart.items)
    // })
    // cart$.collection('items').valueChanges().subscribe(
    //   (items: any[]) => {
    //     this.shoppingCartItemCount = 0;
    //     items.forEach((item: ShoppingCartItem) => {
    //       this.shoppingCartItemCount += item.quantity
    //     })
    //   }
    // )
  }

  logout(){
    this.auth.logout()
  }
}
