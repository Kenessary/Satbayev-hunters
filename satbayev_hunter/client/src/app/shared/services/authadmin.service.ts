import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {tap} from 'rxjs/operators'
import { Admin } from '../interfaces'

@Injectable({
    providedIn: 'any'
})
export class AuthadminService{
    
  private token = null

  constructor(private http: HttpClient) {
  }

  login(admin: Admin): Observable<{token: string}> {
    return this.http.post<{token: string}>('http://localhost:5000/api/authadmin/login', admin)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}