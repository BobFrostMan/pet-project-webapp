import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptorService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    let token = localStorage.getItem('token');
    options.headers.set('token', token);
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let token = localStorage.getItem('token');
      options = {headers: new Headers()};
      options.headers.set('token', token);

      console.log("Request interception for url " + url.toString() +", added token value");
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpInterceptorService) {
    // we have to pass HttpInterceptorService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}