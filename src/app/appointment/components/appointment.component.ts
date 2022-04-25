import { Component, OnInit, ViewChild} from '@angular/core';
import { Appointment } from 'src/app/core/models/appointment';
import { HttpService } from '../../../app/shared/services/httpService'

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})

export class AppointmentComponent implements OnInit {
  appointments : Appointment[] = [];
  selectedAppointmentId = '';
  displayedColumns : string[] = ['Id','Name','TimeFrom','TimeTo'];

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.loadData();   
  }

  loadData(){
    this.httpService.getAppointments()
    .subscribe( (data: Appointment[]) => {
      this.appointments = data;
    });
  }

  addAppointment(): void{
    let appointment = this.appointments[0];
    this.httpService.addAppointment(appointment)
    .subscribe( () =>
    {
      window.alert("Успешно додаддено");    
    });   
  }
}
