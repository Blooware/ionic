
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
  // DI barcodeScanner
  constructor(public navCtrl: NavController,
   /* private barcodeScanner: BarcodeScanner,*/public aws: AwsProvider) {
  }

  ngOnInit() { }


  data = {};
  lambdaForm() {
    console.log("Lambda Form");
    console.log(this.data)
    var data = this.data;
    this.aws.postToLambda('https://27a5ob9wp8.execute-api.eu-west-2.amazonaws.com/default/IonicTest-PostData', { data }, "Token").subscribe(reply => {
      console.log(reply);
      console.log(reply.body.data);
      
    });
  }

  /*
  setAccount(reply) {
    console.log(reply);

  }*/
  /*
    scan() {
      this.barcodeScanner.scan().then(data => {
          // this is called when a barcode is found
          this.num = data.text
        });      
    }
  */




}
