import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TotalInterface } from '../total-interface';
import {MatCardModule} from '@angular/material/card';
import { ProductsService } from '../products.service';
import { MeasureInterface } from '../measure-interface';
import { ProductsInterface } from '../products-interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ProductViewComponent } from '../product-view/product-view.component';
import { MeasureViewComponent } from '../measure-view/measure-view.component';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    CommonModule,
    ProductViewComponent,
    MeasureViewComponent,
    MatCardModule,
    MatDividerModule,  
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  measureList: MeasureInterface[] = [];
  productList: ProductsInterface[] = [];
  totalProductList: TotalInterface[] = [];
  filteredProductList: ProductsInterface[] = [];
  productsService: ProductsService = inject(ProductsService);

  filterResults(text: string) {
    if (!text) {
      this.filteredProductList = this.productList;
    }

    this.filteredProductList = this.productList.filter(
      product => product?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  constructor() {
  
    this.productsService.getAllProducts().then((productList: ProductsInterface[]) => {
      this.productList = productList;
      this.filteredProductList = productList;
    });

    this.productsService.getAllMeasure().then((measureList: MeasureInterface[]) => {
      this.measureList = measureList;
    });

    this.productsService.getProductsWithMeasures().then((totalProductList: TotalInterface[]) => {
      this.totalProductList = totalProductList;
      console.log(totalProductList);
    });
  }
}
