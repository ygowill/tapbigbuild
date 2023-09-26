import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
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
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component"


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  displayedColumns: string[] = ['login', 'dept', 'onboard', 'fullname'];
  dataSource: MatTableDataSource<UserInfo>;
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

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private dialog: MatDialog,
              private service: UserService,
              private cd:ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.service.getUsers().subscribe(data => {
      console.log(data);
      let employee_data: UserInfo[] = []
      for (let i=0;i<data.results.length;i++) {
        employee_data.push({
          login: data.results[i]["login"],
          dept: data.results[i]["department"],
          onboard: new Date(data.results[i]["onboard_date"]),
          fullname: data.results[i]["name"]
        });
      }
      console.log(employee_data);
      this.dataSource = new MatTableDataSource<UserInfo>(employee_data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(this.dataSource);
    })
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

  open_add_user_dialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      minWidth:"18rem",
      height:"auto",
    });
  }
}

export interface UserInfo {
  login?: string;
  dept?: string;
  onboard?: Date;
  fullname?: string;
}
