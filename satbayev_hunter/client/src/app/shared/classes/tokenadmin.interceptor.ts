import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthadminService } from '../services/authadmin.service';
import { Observable, throwError } from 'rxjs';

@Injectable()

export class TokenAdminInterceptor implements HttpInterceptor {
    constructor(private authadmin: AuthadminService,
                private router: Router){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        if (this.authadmin.isAuthenticated()){
            req = req.clone({
                setHeaders:{
                    Autorization: this.authadmin.getToken()
                    }
                })
            }
            return next.handle(req).pipe(
                catchError(
                    (error: HttpErrorResponse)=> this.handleAuthError(error )
                         )
                    )
        }

        private handleAuthError(error: HttpErrorResponse): Observable<any>{
            if (error.status === 401){
                this.router.navigate(['/login'],{
                    queryParams:{
                        sessionFailed: true
                    }
                })
    
            }
            return throwError(error)
        }
    }