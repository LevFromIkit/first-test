import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TotalInterface } from '../total-interface';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    MatTableModule, 
    CommonModule,
    MatCardModule,  
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
  @Input() productInterface!: TotalInterface[];


  displayedColumns: string[] = ['id', 'name', 'quantity', 'unit_coast', 'measure'];
  
  constructor(private router: Router) { }

  onRowClick(row: TotalInterface) {
    this.router.navigateByUrl(`/product-details/${row.id}`);
  }

  
}
