import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { ProductsService } from '../products.service';
import { MeasureInterface } from '../measure-interface';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {ChangeDetectionStrategy, inject, Component} from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';


@Component({
  selector: 'app-measure-detail',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatButtonModule, 
    MatDividerModule, 
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './measure-detail.component.html',
  styleUrl: './measure-detail.component.scss'
})

export class MeasureDetailComponent {

  applyForm = new FormGroup({
    name: new FormControl(''),
  });

  productsService = inject(ProductsService);
    measureInterface: MeasureInterface | undefined;
    route: ActivatedRoute = inject(ActivatedRoute);
    measureInterfaceId = -1;
    measureId = 0;
    constructor() {

        this.measureId = parseInt(this.route.snapshot.params['id'], 10);
        this.productsService.getTotalById(this.measureId).then((measureInterface) => {
          this.measureInterface = measureInterface;
        });
    }

    deleteMeasure() {
      this.productsService.deleteMeasure(this.measureId);
    }

    updateMeasure() {
      this.productsService.updateMeasure(
        this.measureId,
        this.applyForm.value.name ?? '',
      )
    }

    submitApplicationMeasure() {
        this.productsService.submitApplication(
          this.applyForm.value.name ?? '', 0, 0, 0);
      }
}
