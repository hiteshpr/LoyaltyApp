import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class RestProvider {

  url = "http://localhost:1234/";

  
  constructor(
    private _http: Http
  ) { }
  
  signup(data) {
    
    const url = this.url + 'signup/user';
    
    return this._http.post(url, data);
  }

  login(data){
    const url = this.url + 'login/user';
    
    return this._http.post(url, data);
  }

  getproducts(){
    const url = this.url + 'products/getAll';

    return this._http.get(url);
  }



}
