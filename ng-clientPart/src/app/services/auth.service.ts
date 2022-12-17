import { HttpClient } from "@angular/common/http";
import { Inject } from "@angular/core";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from "rxjs";
import { Observable } from "rxjs";
import { AUTH_API_URL } from "../app-injection-tokens";
import { Account } from "../models/account";
import { Auth } from "../models/auth";
import { Registration } from "../models/registration";
import { Token } from "../models/token";
import { ProfileService } from "./profile.service";


export const ACCESS_TOKEN_KEY = 'bookstore_access_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
      @Inject(AUTH_API_URL) private apiUrl: string,
      private jwtHelper: JwtHelperService,
      private router: Router,
      private profile: ProfileService,
      public snack: MatSnackBar ) { }

  login(email: string, password: string): Observable<Token> {
      return this.http.post<Token>(`${this.apiUrl}api/auth/login`,
          { email, password })
          .pipe(
              tap(token => {
                  localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
              }))
  }

  getAccount():Observable<Account>{
    return this.http.get<Account>(`${this.apiUrl}api/auth/getAccount`)
    .pipe(
        tap(data => {
          this.profile.setAccountParams(data);
        }))
  }

  registration(reg: Registration){
    var body = JSON.stringify(reg);
    const headers = { 'content-type': 'application/json'}  ;
    return this.http.post(`${this.apiUrl}api/auth/regUser`, reg)
    .subscribe(
      result => {
        // Handle result
        console.log(result)
      },
      error => {
        console.log(error.status,);
        this.snack.open( error.error);
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      });
  }

  isAuthenticated(): boolean {
      var token = localStorage.getItem(ACCESS_TOKEN_KEY);
      return (token != null) && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      this.router.navigate(['']);
  }
}
