import { Injectable } from '@angular/core'
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs'
import { of } from 'rxjs'
import { server_address } from '../../const/config'
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor (private http: HttpClient) {}

  getUsers(start_date: string | null, end_date: string | null, department: number | null): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("start_date",start_date===null ? "": start_date);
    queryParams = queryParams.append("end_date",end_date===null ? "": end_date);
    queryParams = queryParams.append("department",department===null ? "" : department);
    return this.http.get(`http://${server_address}/api/v1/employees/`, {
      params: queryParams
    });
  }

  getDepartments(): Observable<any> {
    return this.http.get(`http://${server_address}/api/v1/organizations/`);
  }
}
