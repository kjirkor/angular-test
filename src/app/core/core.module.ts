import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localeMk from '@angular/common/locales/mk';
import { InfoDialogComponent } from '../shared/components/dialog/info-dialog/info-dialog.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';

registerLocaleData(localeMk, 'mk');

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MainLayoutComponent, LogInComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ]
})
export class CoreModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/");
}
