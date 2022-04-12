import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [TableComponent,],
  exports:[TableComponent,    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule],
  
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
    
  ],providers: [],
})
export class TableModule { }
