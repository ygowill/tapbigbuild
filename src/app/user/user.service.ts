import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { of } from 'rxjs'
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor (private http: HttpClient) {}

  getUsers (): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }
}
