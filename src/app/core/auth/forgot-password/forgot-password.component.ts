import { SnackbarService } from '../../utils/snackbar.service'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { AllowedCharService } from '../../utils/allowed-char.service'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { InfoDialogComponent } from 'src/app/shared/components/dialog/info-dialog/info-dialog.component'


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading = false;
  forgotPassForm: FormGroup | any;

  constructor(private dialog: MatDialog, private translate: TranslateService, 
    private allowedCharService: AllowedCharService, private authService: AuthService, 
    private router: Router, private fb: FormBuilder, private snackbarService: SnackbarService) { }

  ngOnInit() {
    this.forgotPassForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(/^[a-zA-Z0-9-._]*$/)
      ]],
      contactPhoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/),
        Validators.maxLength(8)
      ]]
    })
  }

  numberOnly(event : any) {
    return this.allowedCharService.numberOnly(event)
  }

  usernameAllowedChars(event : any){
    return this.allowedCharService.usernameAllowedChars(event)    
  }

  openInfoDialog() {
    this.translate.get('authorization.logInScreenInfo').toPromise()
      .then((value) => {
        this.dialog.open(InfoDialogComponent, {
          width: '300px',
          data: { body: value }
        })
      })
  }

  onSubmit() {
    this.loading = true
    let username: string = this.forgotPassForm.controls['username'].value
    let contactPhoneNumber: string = '389' + this.forgotPassForm.controls['contactPhoneNumber'].value

    this.authService.forgotPassword(username, contactPhoneNumber)
      .subscribe(
        res => {
          this.loading = false
          this.snackbarService.showSnackbar("authorization.successForgotPassword")
          setTimeout(
            () => this.router.navigate(['/auth/log-in']),
            3000
          )
        },
        error => {
          this.loading = false
          console.error(error)
          this.snackbarService.showSnackbar('error')
        }
      )
  }
}
