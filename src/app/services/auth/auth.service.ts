import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpInterceptorService } from './../interceptor/interceptor.service';

import { CookieService } from 'ngx-cookie-service';

import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/map'



@Injectable()
export class AuthenticationService {
    constructor(
        private http: HttpInterceptorService,
        private cookieService: CookieService
        ) { }

    login(login: string, password: string) {
        return this.http.post(environment.apiEndpoint + "auth", { "login" : login, "pass" : password}).map(
            (res: Response)=> {
                console.log("Server processed request successfully");
                console.log(res);
                let authResp:AuthResponse = Object.assign(new AuthResponse(), JSON.parse(res.text()));
                console.log(authResp);
                if (authResp.status == 200){
                    console.log("Set token and expiration to browser local storage");
                    //this.cookieService.set('token', authResp.data.value, new Date(authResp.data.expiration));

                    //TODO: think about this solution for auth.guard
                    localStorage.setItem('username', authResp.data.username)
                    localStorage.setItem('token', authResp.data.value);
                    //localStorage.setItem('token', authResp.data.value);
                    //localStorage.setItem('login', login);
                    //localStorage.setItem('token-expiration', authResp.data.expiration);
                }
                return authResp;
            }, 
            err => {
                console.log("Error occured!");
                console.log(err.json())
                return err;
            });
    }

    logout() {
        // remove all from local storage to log user out
        console.log("Logout, and clering local storage");
        localStorage.clear();
    }
}


export class AuthResponse{
    status: number;
    data:RespData;
}

export class RespData{
    expiration:string;
    value:string;
    username:string;
}
