
import { NavController } from '@ionic/angular';
// Add BarcodeScanner
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AwsProvider } from "../api/user.service";

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  num: string;
  results: Observable<any>;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public aws: AwsProvider) {}


  ngOnInit() {}
  data = {};

  lambdaForm() {
    var data = this.data;
    this.aws.postToLambda('https://27a5ob9wp8.execute-api.eu-west-2.amazonaws.com/default/IonicTest-PostData', { data }, "Token").subscribe(reply => {
      console.log(reply);
    });
  }
}
