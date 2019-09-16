import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';



/* DON'T FORGET TO ADD ROUTES TO THE APP ROUTING MODULE*/
/* blooware*/
@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(public router: Router) { }


  public to(page, params?) {
    let navigationExtras: NavigationExtras = {
      queryParams: params
    };
    this.router.navigate(page, navigationExtras);
  }

}
