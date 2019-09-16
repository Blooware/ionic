import { NgModule } from '@angular/core';
import { AuthGuardService } from './gaurds/auth-gaurd.service';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], loadChildren: './tabs/tabs.module#TabsPageModule' },
 // { path: 'home', loadChildren: './members/home/home.module#HomePageModule' },
  { path: 'reset', loadChildren: './account-manager/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'signUp', loadChildren: './account-manager/signup/signup.module#SignupPageModule' },
  { path: 'login', loadChildren: './account-manager/login/login.module#LoginPageModule' },
  { path: 'confirm', loadChildren: './account-manager/confirm/confirm.module#ConfirmPageModule' },
 /* {
    path: 'members',
    canActivate: [AuthGuardService],
    loadChildren: './members/members.module#MembersPageModule'
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }