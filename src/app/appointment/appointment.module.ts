import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { appointmentRoutingModule } from './appointment-routing.module';
import { AppointmentComponent } from './components/appointment.component';


@NgModule({
  declarations: [AppointmentComponent],
  imports: [
    CommonModule,
    appointmentRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ]
})
export class appointmentModule { }
