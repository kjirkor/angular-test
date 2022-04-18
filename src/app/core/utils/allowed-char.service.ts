import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AllowedCharService {

  constructor() { }

  usernameAllowedChars = (event : any) => {
    const charCode = (event.which) ? event.which : event.keyCode;
      if (!(charCode > 44 && charCode < 58 && charCode != 47) && // numeric (0-9) and (-.)
          !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
          !(charCode > 94 && charCode < 123 && charCode != 96)) { // lower alpha (a-z) and (_)
        return false;
      }   
    return true;
  }

  numberOnly = (event : any) => {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
