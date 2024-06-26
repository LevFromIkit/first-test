import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MeasureInterface } from '../measure-interface';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-measure-view',
  standalone: true,
  imports: [
    MatTableModule, 
    CommonModule,
    MatCardModule,  
    MatDividerModule, 
    MatIconModule
  ],
  templateUrl: './measure-view.component.html',
  styleUrl: './measure-view.component.scss'
})
export class MeasureViewComponent {
  
  @Input() measureInterface!: MeasureInterface[];
  displayedColumns: string[] = ['id', 'name'];

  constructor(private router: Router) {}

  onRowClick(row: MeasureInterface) {
    this.router.navigateByUrl(`/measure-details/${row.id}`);
  }
}


