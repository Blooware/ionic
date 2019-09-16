import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetPasswordPage } from './reset-password';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: ResetPasswordPage }])
  ],
})
export class ResetPasswordPageModule {}
