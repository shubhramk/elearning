import { Injectable }     from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LocalStorageService} from "./local-storage.service";
import {ConstantConfig} from "../config/constant.config";

@Injectable()
export class AuthService {
     constructor ( private http:Http , private localStorage:LocalStorageService) {}

    //Auth REQUEST
    login(url,obj: Object): Observable<any> {
      let body    = JSON.stringify(obj); // Stringify payload
      let options = new RequestOptions({ headers: this.getHeaders() }); // Create a request option

      return this.http.post(url, body, options) //using post request
        .map((res:Response) => res.json()) //and calling .json() on the response to return data
        .catch((error:any) => Observable.throw(error.json() || error.json().error || 'Server error')); //errors if any
    }

    //set Auth Headers
    getHeaders():Headers{
      let headers = new Headers(); //Set content type to JSON
      headers.append('Content-Type','application/json' );
      return headers;
    }

    //check login status
   isLoggedIn():boolean{
       var data = this.localStorage.get(ConstantConfig.AUTH_TOKEN);
       return data ? true : false ;
   }
}
