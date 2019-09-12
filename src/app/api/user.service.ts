
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';

import {  mapTo } from 'rxjs/operators';


@Injectable()
export class AwsProvider {

  constructor(private http: HttpClient) {
    console.log('Hello AWS Provider');

  }

  public postToLambda(url, params, token) {
    console.log(token);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + token.toString()
        })
      };
      

      return this.http.post(url, params, httpOptions)

      
  }

  
}