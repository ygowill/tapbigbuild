import { Component, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort} from "@angular/material/sort";
import {
  DateRange,
  ExtractDateTypeFromSelection,
  MatDatepicker,
  MatDatepickerInputEvent
} from "@angular/material/datepicker";
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {range} from "rxjs";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  displayedColumns: string[] = ['login', 'dept', 'onboard', 'fullname'];
  dataSource = new MatTableDataSource<UserInfo>(ELEMENT_DATA);
  selectedDepartment: any;
  departments = [
    {
      "value": "FRPPE"
    }
  ]
  start_date = null
  end_date = null

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    console.log(sortState);
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  // constructor(private service: UserService) {
  //   this.service.getUsers().subscribe(data => {
  //     this.user_data = data;
  //   })
  // }

  update_data_source() {
    console.log(this.selectedDepartment);
    console.log(this.start_date, this.end_date);
    console.log(this.range)
  }

  date_change(date_type: string, $event: any) {
    if (date_type === "start_date") {
      this.start_date = $event.value;
      this.end_date = null;
    } else {
      this.end_date = $event.value;
      this.update_data_source();
    }
  }


}

export interface UserInfo {
  login: string;
  dept: string;
  onboard: string;
  fullname: string;
}

const ELEMENT_DATA: UserInfo[] = [
  {login: "qinwil", dept: "FRPPE", onboard: "1/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "2/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "8/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "9/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "10/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "11/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "3/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "4/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "5/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "6/8/2023", fullname: "Will Qin"},
  {login: "qinwil", dept: "FRPPE", onboard: "7/8/2023", fullname: "Will Qin"},
];
