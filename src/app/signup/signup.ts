import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App} from "@ionic/angular";
import { ConfirmPage } from "../confirm/confirm";
import { LoginPage } from "../login/login";
import { CognitoServiceProvider } from "../../providers/cognito-service/cognito-service";
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  e: string;
  p: string;
  cp: string;
  error = null;
  constructor(public CognitoService:CognitoServiceProvider, public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
  }

  register() {

    if(this.cp == this.p){
      this.CognitoService.signUp(this.e, this.p).then(
        res => {
          console.log(res);
          console.log()
          this.appCtrl.getRootNav().push(LoginPage, {message: "You need to verify your account. Check your email for the verification link (It may be in the Junk folder)", p : this.p, e: this.e});
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  Login() {
    this.appCtrl.getRootNav().push(LoginPage);
  }
  
  Confirm() {
    this.appCtrl.getRootNav().push(ConfirmPage);
  }

  privacy() {
    window.open("https://www.blooware.co.uk/privacy", '_blank')
  }

  terms() {
    window.open("https://www.blooware.co.uk/privacy", '_blank')
  }

}
