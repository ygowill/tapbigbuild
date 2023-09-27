import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { server_address } from '../../const/config'

@Injectable({
  providedIn: 'root'
})
export class QuotaService {

  constructor(private http: HttpClient) { }

  getUserQuota() {
    return this.http.get(`http://${server_address}/api/v1/quotastatistics/`)
  }

  getDepartmentQuota() {
    return this.http.get(`http://${server_address}/api/v2/quotastatistics/get_all_groupby_department/`)
  }
}
