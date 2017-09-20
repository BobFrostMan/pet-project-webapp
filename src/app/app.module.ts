import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend  } from '@angular/http';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/Rx';

import { routing } from './app.routing';
import { HttpInterceptorService } from './services/interceptor/interceptor.service';
import { AlertService } from './services/alert/alert.service';
import { AuthenticationService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

import { AuthGuard } from './guards/auth/auth.guard';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './directives/alert/alert.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,

    routing
  ],
  providers: [UserService, AlertService, AuthGuard, AuthenticationService, CookieService, {
     provide: HttpInterceptorService,
     useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
  return new HttpInterceptorService(backend, options);
}