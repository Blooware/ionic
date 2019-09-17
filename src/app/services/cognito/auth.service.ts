import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as AWSCognito from "amazon-cognito-identity-js";
import { Storage } from "@ionic/storage";
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import {awsConfig} from "./config";

const TOKEN_KEY = 'auth-token';
 

@Injectable()
export class AuthService {

  authenticationState = new BehaviorSubject(false);
  
  constructor(public http: HttpClient, public storage: Storage, public plt: Platform, public config : awsConfig) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  _POOL_DATA = this.config.data;
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login(email, password) {

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
          this.storage.set(TOKEN_KEY, result).then(() => {
            this.authenticationState.next(true);
          });

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
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }

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

  resetPassword(userName) {
    const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

    // setup cognitoUser first


    console.log(userName);
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




  /*
 

  

  refresh() {
    var x = this.storage;
    var dis = this;
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser != null) {
        cognitoUser.getSession(function (err, session) {
          if (err) {
            this.signOut();
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

  public signOut() {
    var dis = this;
    var x = this.storage;
    return new Promise((resolved, reject) => {
      const userPool = new AWSCognito.CognitoUserPool(this._POOL_DATA);

      const cognitoUser = userPool.getCurrentUser();

      cognitoUser.signOut();

      x.remove('session').then(() => {
        dis.authenticationState.next(false);

      });
      resolved();
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
      }
    });
  }

  */

}
