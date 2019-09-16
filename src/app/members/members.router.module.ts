import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRouterModule { }
