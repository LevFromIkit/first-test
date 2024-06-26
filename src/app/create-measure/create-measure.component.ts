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
  selector: 'app-create-measure',
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
  templateUrl: './create-measure.component.html',
  styleUrl: './create-measure.component.scss'
})
export class CreateMeasureComponent {

  productsService = inject(ProductsService);
  applyForm = new FormGroup({
    name: new FormControl(''),
  });

  createProduct(){
    this.productsService.createMeasure(
      this.applyForm.value.name ?? "",
    )
  };
}
