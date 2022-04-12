import { NewStudentComponent } from './modules/new-student/new-student.component';
import { StaffComponent } from './modules/staff/staff.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { TableComponent } from './modules/shared/table/table.component';
import { StudentsComponent } from './modules/students/students.component';

const routes: Routes = [
  {path:'',redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'houses/', component: HomeComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'new-student', component: NewStudentComponent},
  {path: 'staff', component: StaffComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
