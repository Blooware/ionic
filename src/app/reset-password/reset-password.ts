import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from "@ionic/angular";
import { CognitoServiceProvider } from "../../providers/cognito-service/cognito-service";
import { LoginPage } from "../login/login";

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  error = null;
  loginForm = { password: null, code: null, email: null }
  constructor(public navCtrl: NavController, public navParams: NavParams, private cognitoService: CognitoServiceProvider, public appCtrl : App) {
    this.loginForm.email = navParams.get("email");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }


  confirmReset() {
    this.cognitoService.confirmPassword(this.loginForm.email, this.loginForm.code, this.loginForm.password).then(val => {
      this.appCtrl.getRootNav().push(LoginPage, {message : "Password reset successful. Login below."});
    }, err => {
      this.error = err.message;
    });
  }

  logIn(){
    this.appCtrl.getRootNav().push(LoginPage);
  }

  
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void{
      this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
  }
  public getType() {
      return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

}
