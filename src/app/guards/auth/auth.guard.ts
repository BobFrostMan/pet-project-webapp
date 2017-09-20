import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let login = localStorage.getItem('login');
        if (login != null) {
            console.log("Authorized as '" + login + "'. Redirect allowed.");
            return true;
        }

        console.log("Token wasn't found in local storage. Redirect was not allowed. Redirecting to /login page instead");
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
    
}