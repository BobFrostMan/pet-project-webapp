import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {

	//private http: HttpClient;

	constructor(private http: Http) {
	}

	//returns token value on successfull authorisation, else return error
	auth(login:string, pass:string):string | null{
		let payload = { 
			"login" : login,
			"pass" : pass
		}

		this.http.post(environment.apiEndpoint + "auth", payload).subscribe(
			res => {
				console.log("Server processed request successfully");
				console.log(res.json());
				let jsonRes = res.json();
				console.log(jsonRes);
				let authResp:AuthResponse = Object.assign(new AuthResponse(), JSON.parse(res.json()));
				console.log(authResp.value);
			}, 

			err => {
				console.log("Error occured!");
				console.log(err.json())
			});
		return null;
	}

	hasToken(req):boolean {
		return req.headers.has('token');
	}

}

class AuthResponse{
	expiration:string;
	value:string;
}
