import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetPasswordPage } from './reset-password';

@NgModule({
  declarations: [
    ResetPasswordPage,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ResetPasswordPage }])
  ],
})
export class ResetPasswordPageModule {}
