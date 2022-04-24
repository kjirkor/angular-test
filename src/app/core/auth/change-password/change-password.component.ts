import { SnackbarService } from '../../utils/snackbar.service'
import { Component, OnInit } from '@angular/core'
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  loading = false
  hidePass = true
  hideConfPass = true
  model: any = {}

  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loading = true
    this.authService.changePassword(this.model.password)
    .subscribe({
        next: (res) => {
          this.loading = false
          this.router.navigate(['/appointment'])          
          this.snackbarService.showSnackbar("authorization.successPasswordChange")
        },
        error: (error) => {
          this.loading = false
          console.error(error)
          this.snackbarService.showSnackbar("error")
        }
      }
    )
  }

}
