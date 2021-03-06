import { Component } from '@angular/core';
import { NavController} from "@ionic/angular";
import { ConfirmPage } from "../confirm/confirm";
import { LoginPage } from "../login/login";
import { AuthService } from "../../services/cognito/auth.service";
import { NavigateService } from '../../navigate.service';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  e: string;
  p: string;
  cp: string;
  error = null;
  constructor(public cognitoService: AuthService, public navCtrl: NavController, public navigate : NavigateService) {
  }

  register() {

    if(this.cp == this.p){
      this.cognitoService.signUp(this.e, this.p).then(
        res => {
          console.log(res);
          this.navigate.to(['confirm'], false, {message: "You need to verify your account. Check your email.", e : this.e}); 
        },
        err => {
          console.log(err);
          this.error = err.message;
        }
      );


    }else{
      this.error = "Passwords don't match";
    }
    
  }

  privacy() {
    window.open("https://www.blooware.co.uk/privacy", '_blank')
  }

  terms() {
    window.open("https://www.blooware.co.uk/privacy", '_blank')
  }

}
