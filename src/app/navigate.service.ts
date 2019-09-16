import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';



/* DON'T FORGET TO ADD ROUTES TO THE APP ROUTING MODULE*/
/* blooware*/
@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(public router: Router, public navCtrl : NavController) { }


  public to(page, root?, params?) {
    let navigationExtras: NavigationExtras = {
      queryParams: params
    };

    if (root == true) {
      this.navCtrl.navigateRoot(page, navigationExtras);
      console.log("ROOT");
    } else {
      this.router.navigate(page, navigationExtras);
    }
  }

}
