import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from 'src/app/core/models/appointment';
import { HttpService } from '../../../app/shared/services/httpService'

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})

export class ExampleComponent implements OnInit {
  appointments : Appointment[] = [];
  selectedAppointmentId = '';
  picker : any;
  

  constructor(public httpService: HttpService) { }

  ngOnInit(): void {
    this.loadData();   
  }

  loadData(){
    this.httpService.getAppointments()
    .subscribe( data => {
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

    window.alert(this.picker);
  }
}
