import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWSCognito from "amazon-cognito-identity-js";
import { Storage } from "@ionic/storage";
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
/*
  Generated class for the CognitoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthService {

  authenticationState = new BehaviorSubject(false);
  constructor(public http: HttpClient, public storage: Storage, public plt : Platform) {
    console.log('Hello CognitoServiceProvider Provider');
    this.plt.ready().then(() => {
      this.refresh();
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }


  _POOL_DATA = {
    UserPoolId: "eu-west-2_d2B9fAZQy",
    ClientId: "3fvchqqlm2ke28c8i9cftli9h7"
  };

  signUp(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      let userAttribute = [];
      userAttribute.push(
        new AWSCognito.CognitoUserAttribute({ Name: "email", Value: email })
      );

      userPool.signUp(email, password, userAttribute, null, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }

  confirmUser(verificationCode, userName) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: userName,
        Pool: userPool
      });

      cognitoUser.confirmRegistration(verificationCode, true, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolved(result);
        }
      });
    });
  }

  refresh() {
    var x = this.storage;
    var dis = this;
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = userPool.getCurrentUser();


      if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
          if (err) {

            reject(err);
          } else {

            x.set('session', session.idToken.jwtToken).then((val) => { 
              dis.authenticationState.next(true);
              resolved(session.idToken.jwtToken);
            });
          }
        });
      }

    });
  }

  signOut() {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = userPool.getCurrentUser();

      cognitoUser.signOut();
      resolved();
    });
  }

  authenticate(email, password) {
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const authDetails = new AWSCognito.AuthenticationDetails({
        Username: email,
        Password: password
      });

      const cognitoUser = new AWSCognito.CognitoUser({
        Username: email,
        Pool: userPool
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: result => {
          resolved(result);
        },
        onFailure: err => {
          reject(err);
        },
        newPasswordRequired: userAttributes => {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          userAttributes.email = email;
          delete userAttributes.email_verified;

          cognitoUser.completeNewPasswordChallenge(password, userAttributes, {
            onSuccess: function (result) { },
            onFailure: function (error) {
              reject(error);
            }
          });
        }
      });
    });
  }

  resetPassword(userName) {
    const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

    // setup cognitoUser first
    const cognitoUser = new AWSCognito.CognitoUser({
      Username: userName,
      Pool: userPool
    });

    // call forgotPassword on cognitoUser
    cognitoUser.forgotPassword({
      onSuccess: function (result) {
        console.log('call result: ' + result);
      },
      onFailure: function (err) {
        console.log(err);
      }/*,
      /*inputVerificationCode() { // this is optional, and likely won't be implemented as in AWS's example (i.e, prompt to get info)
        var verificationCode = prompt('Please input verification code ', '');
        var newPassword = prompt('Enter new password ', '');
        cognitoUser.confirmPassword(verificationCode, newPassword, this);
      }*/
    });
  }

  confirmPassword(userName, verificationCode, newPassword) {
    const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

    // setup cognitoUser first
    const cognitoUser = new AWSCognito.CognitoUser({
      Username: userName,
      Pool: userPool
    });

    return new Promise((resolve, reject) => {
        cognitoUser.confirmPassword(verificationCode, newPassword, {
            onFailure(err) {
                reject(err);
            },
            onSuccess() {
                resolve();
            },
        });
    });
}

}
