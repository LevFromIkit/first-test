import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ProductsService } from '../products.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangeDetectionStrategy, Component, inject, } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'create-product.component.html',
  styleUrl: './create-product.component.scss',
})

export class CreateProductComponent {

  productsService = inject(ProductsService);
  applyForm = new FormGroup({
    name: new FormControl(''),
    quantity: new FormControl(''),
    unit_coast: new FormControl(''),
    measure: new FormControl(''),
  });

  createProduct(){
    this.productsService.createProduct(
      this.applyForm.value.name ?? "",
      Number(this.applyForm.value.quantity ?? 0),
      Number(this.applyForm.value.unit_coast ?? 0),
      Number(this.applyForm.value.measure ?? 0),
    )
  };
}
