import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Appointment } from '../../core/models/appointment';


@Injectable({
    providedIn: 'root',
  })

export class HttpService{
    
    apiBaseUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) {}

    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type" : 'application/json'
        })
    };

    getAppointments() : Observable<Appointment>{   
        
        let result =  this.http.get<Appointment>(this.apiBaseUrl + "/appointments");      
        
        return result;
    }

    getAppointment(id: number): Observable<Appointment> {
        return this.http.get<Appointment>(this.apiBaseUrl + "/appointments/"+id)
        .pipe(retry(1), catchError(this.handleError));
    }

    updateAppointment(id: number, appointment: Appointment ) : Observable<Appointment>{
        return this.http.put<Appointment>(this.apiBaseUrl + "/appointments/" + id,
        JSON.stringify(appointment),
        this.httpOptions)
        .pipe(retry(1), catchError(this.handleError));        
    }

    deleteAppointment(id: number){
        return this.http.delete(this.apiBaseUrl + "/appointments/" + id,
        this.httpOptions)
        .pipe(retry(1), catchError(this.handleError))
    }

    handleError(error: any){
        let errorMessage = '';
        window.alert("handleError")
        if(error.error instanceof ErrorEvent){
             errorMessage = error.error.message;
        }else{
            errorMessage =  `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        window.alert(errorMessage);

        return throwError(() => {
            return errorMessage;
        })
    }
}
