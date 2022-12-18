import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  filterProducts: Product[] = [];
  category!: string | null;
  shopCart!: Observable<ShoppingCart>;
  cart: any;
  subscription!: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(map(querySnap =>  querySnap.docs.map(doc => Object.assign({id: doc.id}, doc.data() as any))))
      .pipe(switchMap(products =>  {
        this.products = products;
        return route.queryParamMap;
      }))
      .subscribe(params => {
          this.category = params.get('category');
          this.filterProducts = this.category ?
            this.products.filter(p => p.category === this.category) : this.products
      });
  
  }

  async ngOnInit() {
    this.shopCart = await this.cartService.getCart();
    this.subscription = this.shopCart.subscribe(shopCart => this.cart = shopCart)
    // this.cartDoc.valueChanges().subscribe(doc => {
    //   // console.log(doc.id)
    //   console.log(doc)
    // })
    // this.cartDoc.get().subscribe(cart => cart.id)
    // this.cartDoc.collection('items').valueChanges()
    //   .subscribe(items => this.cart = { items })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
