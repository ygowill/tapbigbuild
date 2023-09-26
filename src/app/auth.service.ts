import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {LoggedInUser, UserCredentials} from "./auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  setLoggedInUser(userData: LoggedInUser): void {
    if (localStorage.getItem('userData') !== JSON.stringify(userData)) {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  logIn(username: string, password: string): Observable<LoggedInUser> {
    return this.http.post(
      'http://127.0.0.1:8000/api-user-login/', { username, password }
    ) as Observable<LoggedInUser>;
  }
}
