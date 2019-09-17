import { Component } from '@angular/core';
import { SignupPage } from "../signup/signup";
import { Storage } from '@ionic/storage';
import { ResetPasswordPage } from "../reset-password/reset-password";
import { AuthService } from "../../services/cognito/auth.service";
import { AlertController } from "@ionic/angular";
import { NavigateService } from '../../navigate.service';
import { Router, ActivatedRoute } from '@angular/router';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm = { password: null, email: null }
  error = null;
  message = null;
  showForm = true;
  data: any;

  constructor(public storage: Storage, private alertCtrl: AlertController, public cognitoService: AuthService, public navigate: NavigateService, public route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params => {
      this.message = params.message;
      this.loginForm.password = params.p;
      this.loginForm.email = params.e
    });
  }

  passwordCheckbox;

  login() {
    let disObject = this;
    this.cognitoService.login(this.loginForm.email, this.loginForm.password).then(function () {

      disObject.error = null;
    }).catch(function (e) {
      console.log(e);
      disObject.error = e.message;
    });;
  }

  reset() {
    if (this.loginForm.email) {
      this.navigate.to(['reset'], false, { email: this.loginForm.email });
    } else {
      this.error = "Please enter your email";
    }
  }

  signUp() {
    this.navigate.to(['signUp']);
  }

  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }

  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }

}
