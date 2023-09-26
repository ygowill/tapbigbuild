import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import { UserService } from './user.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort} from "@angular/material/sort";
import { DatePipe } from '@angular/common';
import {
  DateRange,
  ExtractDateTypeFromSelection,
  MatDatepicker,
  MatDatepickerInputEvent
} from "@angular/material/datepicker";
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {range} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./add_user_dialog/dialog.component"
import {A} from "@angular/cdk/keycodes";
import {matLegacyTooltipAnimations} from "@angular/material/legacy-tooltip";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [DatePipe]
})
export class UserComponent {
  displayedColumns: string[] = ['login', 'dept', 'onboard', 'fullname'];
  employee_data: UserInfo[] = [];
  dataSource: MatTableDataSource<UserInfo> = new MatTableDataSource<UserInfo>();
  selectedDepartment: string = "";
  selectedDepartmentID: number | null = null;
  departments_info: any;
  departments_list: string[] = [];
  start_date: string = "";
  end_date:string = "";

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,
              private dialog: MatDialog,
              private service: UserService,
              public datepipe: DatePipe,
              private cd:ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.service.getDepartments().subscribe(data => {
      this.departments_list = data.results.map((item: { dept: any; }) => item.dept);
      this.departments_info = data;
    })
    this.update_data_source();
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
    let param_start: string | null = "";
    let param_end: string | null = "";

    if (this.start_date == "") {
      param_start = "";
    } else {
      param_start = this.datepipe.transform(this.start_date, 'yyyy-MM-dd');
    }
    if (this.end_date === "") {
      param_end = "";
    } else {
      param_end = this.datepipe.transform(this.end_date, 'yyyy-MM-dd');
    }

    if (this.departments_info) {
      for (let i=0;i<this.departments_info.results.length;i++) {
        if (this.selectedDepartment === this.departments_info.results[i]["dept"]) {
          this.selectedDepartmentID = this.departments_info.results[i]["id"];
          console.log("selectedDepartmentID", this.selectedDepartmentID);
          break;
        }
      }
    }

    this.service.getUsers(
      param_start,
      param_end,
      this.selectedDepartmentID).subscribe(data => {
      // console.log("$$$$$$$",data);
      this.employee_data = [];
      for (let i=0;i<data.length;i++) {
        this.employee_data.push({
          id: data[i]["id"],
          login: data[i]["login"],
          dept: data[i]["dept"]["dept"],
          onboard: new Date(data[i]["onboard_date"]),
          fullname: data[i]["name"]
        });
      }
      // console.log("======",this.employee_data);
      this.dataSource.data = this.employee_data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // this.cd.detectChanges();
      // console.log(this.dataSource);
    });
  }

  date_change(date_type: string, $event: any) {
    if (date_type === "start_date") {
      this.start_date = $event.value;
      this.end_date = "";
    } else {
      this.end_date = $event.value;
      this.update_data_source();
    }
  }

  open_add_user_dialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      minWidth:"26rem",
      height:"auto",
    });
  }

  clear_date_range() {
    this.range.reset();
    this.start_date = "";
    this.end_date = "";
    this.update_data_source();
  }

  clear_department() {
    this.selectedDepartment = "";
    this.selectedDepartmentID = null;
    this.update_data_source();
  }
}

export interface UserInfo {
  id: number;
  login: string;
  dept: string;
  onboard: Date;
  fullname: string;
}
