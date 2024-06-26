import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TotalInterface } from '../total-interface';
import { ProductsService } from '../products.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ChangeDetectionStrategy, inject, Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatButtonModule, 
    MatDividerModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})

export class ProductDetailComponent {

    applyForm = new FormGroup({
      name: new FormControl(''),
      quantity: new FormControl(''),
      unit_coast: new FormControl(''),
      measure: new FormControl(''),
    });

    productsService = inject(ProductsService);
    productInterface: TotalInterface | undefined;
    route: ActivatedRoute = inject(ActivatedRoute);
    productInterfaceId = -1;
    productsId = 0;

    constructor() {
      this.productsId = parseInt(this.route.snapshot.params['id'], 10);
      this.productsService.getTotalById(this.productsId).then((totalInterface) => {
        this.productInterface = totalInterface;
      });
    }
  
    deleteProduct() {
      this.productsService.deleteProduct(this.productsId);
    }

    updateProduct() {
      this.productsService.updateProduct(
        this.productsId,
        this.applyForm.value.name ?? '',
        Number(this.applyForm.value.quantity ?? 0),
        Number(this.applyForm.value.unit_coast ?? 0),
        Number(this.applyForm.value.measure ?? 0),
      )
    }

    submitApplication() {
      this.productsService.submitApplication(
        this.applyForm.value.name ?? '',
        Number(this.applyForm.value.quantity ?? 0),
        Number(this.applyForm.value.unit_coast ?? 0),
        Number(this.applyForm.value.measure ?? 0),
      );
  }
}
