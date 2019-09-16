import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: SignupPage }])
  ],
})
export class SignupPageModule {}
