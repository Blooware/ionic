import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from "@ionic/angular";
import { TabsPage } from "../tabs/tabs";
import { SignupPage } from "../signup/signup";
import { Storage } from '@ionic/storage';
import { ResetPasswordPage } from "../reset-password/reset-password";
import { CognitoServiceProvider } from "../../providers/cognito-service/cognito-service";
import { AlertController } from "@ionic/angular";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm = { password: null, email: null }
  error = null;
  message = null;
  showForm = true;
  constructor(public storage: Storage, private alertCtrl: AlertController, public cognitoService: CognitoServiceProvider, public navCtrl: NavController, public navParams: NavParams, public appCtrl: App) {
    this.message = navParams.get("message");
    if (navParams.get("p")) {
      this.showForm = false;
      this.loginForm.password = navParams.get("p");
      this.loginForm.email = navParams.get("e");
    }
    this.cognitoService.refresh().then(val => {
      if (val) {
        console.log(val);
        this.pushPage();
      }
    });
  }

  passwordCheckbox;
  logForm() {
    //console.log({ email: this.loginForm.email, password: this.loginForm.password });
    //
    this.login(this.loginForm.email, this.loginForm.password);
    // this.result = "Checking Account";
    //  this.getSession({ code: this.loginForm.code, name: this.loginForm.firstName });
  }

  x = null;
  login(e, p) {
    this.cognitoService.authenticate(e, p)
      .then(res => {
        this.x = res;
        this.storage.set('session', this.x.idToken.jwtToken);
        this.storage.set('cog_user', { email: this.x.idToken.payload.email, password: p });


        //this.linkedIn();
        this.pushPage();
      }, err => {
        this.error = err.message;
        if (this.error == "User is not confirmed.") {
          this.error = "You need to verify your account. Check your email for the verification link (It may be in the Junk folder)";
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  forgotPassword() {
    if (this.loginForm.email) {
      this.cognitoService.resetPassword(this.loginForm.email);
      this.appCtrl.getRootNav().push(ResetPasswordPage, { email: this.loginForm.email });
    } else {
      this.error = "Please enter your email";
    }
  }

  pushPage() {
    this.appCtrl.getRootNav().push(TabsPage);
  }

  signUp() {
    this.appCtrl.getRootNav().push(SignupPage);
  }
  isActiveToggleTextPassword: Boolean = true;
  public toggleTextPassword(): void {
    this.isActiveToggleTextPassword = (this.isActiveToggleTextPassword == true) ? false : true;
  }
  public getType() {
    return this.isActiveToggleTextPassword ? 'password' : 'text';
  }


}
