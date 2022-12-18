import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, switchMap, take } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$!: Observable<any>;
  product: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) {
    this.categories$ = categoryService.getAll()
      .pipe(map(querySnap => {
        return querySnap.docs.map(doc => ({
          id: doc.id,
          name: (doc.data() as any).name
        }))
      }))
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p.data())
  }

  save(product: any){
    console.log(product)
    if(this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete(){
    if(!confirm('Are you sure want to delete this product ?')) return;
    this.productService.delete(this.id as string);
    this.router.navigate(['/admin/products']);
  }

  ngOnInit(): void {
    // this.categories$.subscribe(s => console.log(s))
  }

}
