import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { LogInComponent } from './core/auth/log-in/log-in.component';
import { ForgotPasswordComponent } from './core/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './core/auth/change-password/change-password.component';
import { AuthGuardService } from './core/auth/services/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: "full", redirectTo: "auth/log-in" },
  {
    path: 'auth', component: MainLayoutComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      }
    ]
  },
  { 
    path: 'appointment', 
    component: MainLayoutComponent, 
    loadChildren: () => import('./appointment/appointment.module').then(m => m.appointmentModule),
    canActivate: [AuthGuardService],
    data: { roles: ['appointment_role'] }
  },
  { path: '**', redirectTo: '/auth/log-in', pathMatch: 'full' } //catch-all route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
