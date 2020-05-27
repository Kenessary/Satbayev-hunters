import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of} from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthadminService } from '../services/authadmin.service';

@Injectable({
    providedIn: 'root'
})

export class AuthadminGuard implements CanActivate, CanActivateChild{
    constructor(private authadmin: AuthadminService,
                private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        if (this.authadmin.isAuthenticated()){
            return of(true)
        } else {
            this.router.navigate(['/main'],{
                queryParams:{
                    accessDenied: true
                }
            })
            return of(false)
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
        return this.canActivate(route, state)
    }

}