import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import {LoggedInUser, UserCredentials} from "./auth";
import { server_address } from "../const/config"

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
      `http://${server_address}/api-user-login/`, { username, password }
    ) as Observable<LoggedInUser>;
  }
}
