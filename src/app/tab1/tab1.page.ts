import { Component, OnInit } from '@angular/core';
import { AuthService } from '../cognito/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {

  constructor(public auth : AuthService) { }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
