import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  subscription!: Subscription
  products!: Product[];
  filteredProducts!: Product[];
  // ColumnMode = ColumnMode;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .pipe(map(querySnap =>  querySnap.docs.map(doc => Object.assign({id: doc.id}, doc.data() as any))))
      .subscribe(products => this.filteredProducts = this.products = products)
  }

  filter(query: string){
    console.log(query)
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe()
  }

}
