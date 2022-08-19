import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './components/appointment.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'appointment'},
  { path: 'appointment', component: AppointmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class appointmentRoutingModule { }
