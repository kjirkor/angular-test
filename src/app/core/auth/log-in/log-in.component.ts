import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AllowedCharService } from '../../utils/allowed-char.service';
import { InfoDialogComponent } from 'src/app/shared/components/dialog/info-dialog/info-dialog.component';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../../utils/snackbar.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  model = {
    username: '',
    password: ''
  };

  loading = false;

  constructor(private dialog: MatDialog, private translate: TranslateService, private authService: AuthService,
    private router: Router, private allowedCharService: AllowedCharService, 
    private snackbarService: SnackbarService
  ) {

  }

  ngOnInit() {
  }

  openInfoDialog(): void {
    this.translate.get('authorization.logInScreenInfo').toPromise()
      .then((value) => {
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: { body: value }
        })
      })
  }

  usernameAllowedChars(event : any){
    return this.allowedCharService.usernameAllowedChars(event)    
  }

  onSubmit() {
    this.loading = true;
    this.authService.logIn(this.model.username, this.model.password)
      .subscribe(resp => {
        this.loading = false;
        this.router.navigate(['/example'])
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          console.error(error);
          this.snackbarService.showSnackbar('error')
        })
  }
}