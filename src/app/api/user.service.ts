
import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders  } from '@angular/common/http';

@Injectable()
export class AwsProvider {

  constructor(private http: HttpClient) { }

  public postToLambda(url, params, token) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer ' + token.toString()
        })
      };      

      return this.http.post<any>(url, params, httpOptions);      
  }

  
}