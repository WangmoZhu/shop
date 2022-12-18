import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;

  @Input() category!: string | null;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll()
      .pipe(map(querySnap => querySnap.docs.map(doc => Object.assign({id: doc.id}, doc.data() as any))))
  }

  ngOnInit(): void {
  }

}
