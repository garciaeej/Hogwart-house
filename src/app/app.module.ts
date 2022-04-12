import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { HomeModule } from './modules/home/home.module';
import { NavbarModule } from './modules/shared/navbar/navbar.module';
import { NavbarComponent } from './modules/shared/navbar/navbar.component';
import { TableComponent } from './modules/shared/table/table.component';
import { TableModule } from './modules/shared/table/table.module';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StaffComponent } from './modules/staff/staff.component';
import { StudentsComponent } from './modules/students/students.component';
import { NewStudentComponent } from './modules/new-student/new-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StaffComponent,
    StudentsComponent,
    NewStudentComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HomeModule,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NavbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
