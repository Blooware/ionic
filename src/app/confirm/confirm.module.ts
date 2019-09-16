import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmPage } from './confirm';

@NgModule({
  declarations: [
    ConfirmPage,
  ],
  imports: [
    RouterModule.forChild([{ path: '', component: ConfirmPage }])
  ],
})
export class ConfirmPageModule {}
