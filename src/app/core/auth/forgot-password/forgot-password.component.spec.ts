import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '../../core.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AllowedCharService } from '../../utils/allowed-char.service';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../../utils/snackbar.service';
import { of } from 'rxjs';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [
        MatDialogModule,
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient],
        }
      })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow only numbers in phone number field', inject([AllowedCharService], (allowedCharService: AllowedCharService) => {
    const spyOnMethod = spyOn(allowedCharService, 'numberOnly').and.callThrough()

    let result: boolean = component.numberOnly({ which: 48 }) //keypress -> 0

    expect(spyOnMethod).toHaveBeenCalledTimes(1)
    expect(result).toBe(true)
  }))

  it('should not allow letters in phone number field', inject([AllowedCharService], (allowedCharService: AllowedCharService) => {
    const spyOnMethod = spyOn(allowedCharService, 'numberOnly').and.callThrough()

    let result: boolean = component.numberOnly({ which: 65 }) //keypress -> a

    expect(spyOnMethod).toHaveBeenCalledTimes(1)
    expect(result).toBe(false)
  }))

  it('should enable submit button when form is valid', async () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('#submitBtn')
    component.forgotPassForm.controls['contactPhoneNumber'].setValue('70123456')
    component.forgotPassForm.controls['username'].setValue('test')
    fixture.detectChanges()

    expect(submitBtn.disabled).toBeFalsy()
  })

  it('should disable submit button when phone is not valid', async () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('#submitBtn')
    component.forgotPassForm.controls['contactPhoneNumber'].setValue('7123456')
    component.forgotPassForm.controls['username'].setValue('test')
    fixture.detectChanges()

    expect(submitBtn.disabled).toBeTruthy()
  })

  it('should disable submit button when username is not valid', async () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('#submitBtn')
    component.forgotPassForm.controls['contactPhoneNumber'].setValue('70123456')
    component.forgotPassForm.controls['username'].setValue('')
    fixture.detectChanges()

    expect(submitBtn.disabled).toBeTruthy()
  })

  it('should not call the onSubmit method when form is invalid', async () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('#submitBtn')
    fixture.detectChanges()
    spyOn(component, 'onSubmit')
    submitBtn.click()
    expect(component.onSubmit).toHaveBeenCalledTimes(0)
  })

  it('should call the onSubmit method when form is valid', async () => {
    const submitBtn = fixture.debugElement.nativeElement.querySelector('#submitBtn')
    component.forgotPassForm.controls['contactPhoneNumber'].setValue('70123456')
    component.forgotPassForm.controls['username'].setValue('test')
    fixture.detectChanges()
    spyOn(component, 'onSubmit')
    submitBtn.click()
    expect(component.onSubmit).toHaveBeenCalledTimes(1)
  })

  it('should show success message on success',
    inject([SnackbarService, AuthService],
      async (snackbarService: SnackbarService, authService: AuthService) => {
        const spyOnMethodSnackbar = spyOn(snackbarService, 'showSnackbar').and.callThrough()
        const spyOnMethod = spyOn(authService, 'forgotPassword').and.returnValue(of(true))
        component.forgotPassForm.controls['contactPhoneNumber'].setValue('70123456')
        component.forgotPassForm.controls['username'].setValue('test')
        fixture.detectChanges()
        component.onSubmit()

        expect(spyOnMethod).toHaveBeenCalledWith('test', '38970123456')
        expect(spyOnMethodSnackbar).toHaveBeenCalledWith("authorization.successForgotPassword")
      }))
});
