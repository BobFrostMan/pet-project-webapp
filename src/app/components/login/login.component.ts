import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from './../../services/auth/auth.service';
import { AlertService } from './../../services/alert/alert.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login(login:string, pass:string) {
        this.loading = true;
        this.authenticationService.login(login, pass)
        .subscribe(
            data => {
                this.router.navigate([''], { queryParams: { returnUrl: this.returnUrl }});
            },
            error => {
                console.log(error.status);
                if (error.status == 0){
                    this.alertService.error("Service is currently unavailable. Please, try again later.");
                }

                if (error.status == 403){
                    this.alertService.error("Provided credentials are not valid. Please, provide proper credential information.");
                } else {
                    this.alertService.error(error);
                }
                this.loading = false;
            });
        //TODO: add proper send form handling
        return false;
    }
}
