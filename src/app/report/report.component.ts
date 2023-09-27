// report.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { QuotaService } from './quota.service'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['user', 'dept', 'date', 'usage', 'limit', 'machine'];
  dataSource = new MatTableDataSource<any>();
  showcaseButton: string = "department";
  showcase: string = "Person";
  showCurrentButton: string = "current";
  showCurrent: string = "Historical";

  constructor(private quotaservice: QuotaService) { }

  ngOnInit(): void {
    // You can fetch data from an API or a service here and update dataSource
    // this.dataSource.data = [
    //   {user: 'User A', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
    //   {user: 'User B', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
    //   {user: 'User C', dept: 'Dept 3', date: '2023-09-02', usage: 11, limit: 30, machine: 'windows'},
    //   {user: 'User C', dept: 'Dept 1', date: '2023-09-02', usage: 19, limit: 30, machine: 'windows'},
    //   {user: 'User C', dept: 'Dept 2', date: '2023-09-03', usage: 7, limit: 25, machine: 'linux'},
    //   {user: 'User B', dept: 'Dept 1', date: '2023-09-02', usage: 10, limit: 24, machine: 'linux'},
    //   {user: 'User A', dept: 'Dept 2', date: '2023-09-01', usage: 7, limit: 29, machine: 'linux'},
    //   {user: 'User D', dept: 'Dept 2', date: '2023-09-03', usage: 14, limit: 30, machine: 'windows'},
    //   {user: 'User B', dept: 'Dept 3', date: '2023-09-03', usage: 8, limit: 27, machine: 'linux'},
    //   {user: 'User B', dept: 'Dept 3', date: '2023-09-01', usage: 10, limit: 29, machine: 'windows'},
    // ];
    this.quotaservice.getUserQuota().subscribe(data => {
      // @ts-ignore
      this.dataSource.data = data["data"];
    })

  }

  changeShow() {
    if (this.showcaseButton == "department") {
      this.showcaseButton = "person";
      this.showcase = "Department";
      if (this.showCurrent == 'Historical') {
        // login department's historical usage
        // this.dataSource.data = [
        //   {user: '-', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
        //   {user: '-', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
        // ];

        this.quotaservice.getDepartmentQuota().subscribe(data => {
          console.log(this.dataSource.data);
          // @ts-ignore
          this.dataSource.data = data["data"];
        })
      }
      else {
        // login department's current usage
        this.dataSource.data = [
          {user: '-', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
          {user: '-', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
        ];
      }
    }
    else {
      this.showcaseButton = "department";
      this.showcase = "Person";
      if (this.showCurrent == 'Historical') {
        // login user's historical usage
        // this.dataSource.data = [
        //   {user: 'User A', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
        //   {user: 'User B', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
        //   {user: 'User C', dept: 'Dept 3', date: '2023-09-02', usage: 11, limit: 30, machine: 'windows'},
        //   {user: 'User C', dept: 'Dept 1', date: '2023-09-02', usage: 19, limit: 30, machine: 'windows'},
        //   {user: 'User C', dept: 'Dept 2', date: '2023-09-03', usage: 7, limit: 25, machine: 'linux'},
        //   {user: 'User B', dept: 'Dept 1', date: '2023-09-02', usage: 10, limit: 24, machine: 'linux'},
        //   {user: 'User A', dept: 'Dept 2', date: '2023-09-01', usage: 7, limit: 29, machine: 'linux'},
        //   {user: 'User D', dept: 'Dept 2', date: '2023-09-03', usage: 14, limit: 30, machine: 'windows'},
        //   {user: 'User B', dept: 'Dept 3', date: '2023-09-03', usage: 8, limit: 27, machine: 'linux'},
        //   {user: 'User B', dept: 'Dept 3', date: '2023-09-01', usage: 10, limit: 29, machine: 'windows'},
        // ];

        this.quotaservice.getUserQuota().subscribe(data => {
          // @ts-ignore
          this.dataSource.data = data["data"];
        })
      }
      else {
        // login user's current usage
        this.dataSource.data = [
          {user: 'User A', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
          {user: 'User B', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
          {user: 'User C', dept: 'Dept 3', date: '2023-09-02', usage: 11, limit: 30, machine: 'windows'},
          {user: 'User C', dept: 'Dept 1', date: '2023-09-02', usage: 19, limit: 30, machine: 'windows'},
          {user: 'User C', dept: 'Dept 2', date: '2023-09-03', usage: 7, limit: 25, machine: 'linux'},
          {user: 'User B', dept: 'Dept 1', date: '2023-09-02', usage: 10, limit: 24, machine: 'linux'},
          {user: 'User A', dept: 'Dept 2', date: '2023-09-01', usage: 7, limit: 29, machine: 'linux'},
          {user: 'User D', dept: 'Dept 2', date: '2023-09-03', usage: 14, limit: 30, machine: 'windows'},
          {user: 'User B', dept: 'Dept 3', date: '2023-09-03', usage: 8, limit: 27, machine: 'linux'},
          {user: 'User B', dept: 'Dept 3', date: '2023-09-01', usage: 10, limit: 29, machine: 'windows'},
        ];
      }
    }
  }

  getCurrentUsage() {
    if (this.showCurrentButton == 'historical') {
      this.showCurrentButton = 'current';
      this.showCurrent = 'Historical';
      if (this.showcase == 'Person') {
        // login user's historical usage
        this.dataSource.data = [
          {user: '-', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
          {user: '-', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
        ];
      }
      else {
        // login department's historical usage
        this.dataSource.data = [
          {user: '-', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
          {user: '-', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
        ];
      }
    }
    else {
      this.showCurrentButton = 'historical';
      this.showCurrent = 'Current';
      if (this.showcase == 'Person') {
        // login user's current usage
        this.dataSource.data = [
          {user: '-', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
          {user: '-', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
        ];
      }
      else {
        // login department's current usage
        this.dataSource.data = [
          {user: '-', dept: 'Dept 2', date: '2023-09-01', usage: 12, limit: 29, machine: 'linux'},
          {user: '-', dept: 'Dept 3', date: '2023-09-05', usage: 8, limit: 26, machine: 'windows'},
        ];
      }
    }
  }
}
