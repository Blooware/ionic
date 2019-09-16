import { NgModule } from '@angular/core';

import { AuthGuardService } from './gaurds/auth-gaurd.service';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'reset', loadChildren: './reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signUp', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'confirm', loadChildren: './confirm/confirm.module#ConfirmPageModule' },
  {
    path: 'members',
    canActivate: [AuthGuardService],
    loadChildren: './members/members.module#MembersPageModule'
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

