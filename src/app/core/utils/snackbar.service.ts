import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private translate: TranslateService, private snackbar: MatSnackBar) { }  

  async showSnackbar(message: string) {
    var [localizedMessage, close] = await Promise.all([
      await lastValueFrom(this.translate.get(message)),
      await lastValueFrom(this.translate.get("close"))
    ])

    this.snackbar.open(localizedMessage, close, {
      duration: 5000,
    })
  }
}
