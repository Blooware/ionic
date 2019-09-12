import { Component } from '@angular/core';
import { NavController, NavParams } from "@ionic/angular";
import { LoginPage } from "../login/login";
import { AuthService } from "../cognito/auth.service";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ConfirmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {
  email = null;
  pw = null
  code = null
  error = null;
  hideMe = true;
  constructor(public storage: Storage, public CognitoService: AuthService, public navCtrl: NavController, public navParams: NavParams) {
    this.email = navParams.get("e");
    this.pw = navParams.get("pw");
    if (this.email) {
      if (this.email.length > 0) {
        this.hideMe = false;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }

  verifyUser() {
    this.CognitoService.confirmUser(this.code, this.email).then(
      res => {
       this.autoLogin();
      },
      err => {
        this.error = err.message;
      }
    );
  }

  x = null;
  autoLogin(){
    this.CognitoService.authenticate(this.email, this.pw)
      .then(res => {
        this.x = res;
        console.log(res);
        this.storage.set('session', this.x.idToken.jwtToken);        
        this.storage.set('user', {email : this.x.idToken.payload.email, password : this.pw});
        this.storage.set('cog_user', { email: this.x.idToken.payload.email, password: this.pw });

    
       // this.appCtrl.getRootNav().push(TabsPage);
      }, err => {
        this.error = err.message;
      });
  }

  Login() {
   // this.appCtrl.getRootNav().push(LoginPage);
  }


}
