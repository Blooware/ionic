import { Component } from '@angular/core';
import { NavController, NavParams } from "@ionic/angular";
import { AuthService } from "../../services/cognito/auth.service";
import { LoginPage } from "../login/login";
import { NavigateService } from '../../navigate.service';

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {

  error = null;
  loginForm = { password: null, code: null, email: null }
  constructor(public navCtrl: NavController, public navParams: NavParams, public cognitoService: AuthService, public navigate : NavigateService) {
    this.loginForm.email = navParams.get("email");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }


  confirmReset() {
    this.cognitoService.confirmPassword(this.loginForm.email, this.loginForm.code, this.loginForm.password).then(val => {
     // this.appCtrl.getRootNav().push(LoginPage, {message : "Password reset successful. Login below."});

      this.navigate.to('login', {message : "Password reset successful. Login below."});
    }, err => {
      this.error = err.message;
    });
  }

  logIn(){
   // this.appCtrl.getRootNav().push(LoginPage);
    this.navigate.to('login');
  }

  
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void{
      this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword==true)?false:true;
  }
  public getType() {
      return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

}
