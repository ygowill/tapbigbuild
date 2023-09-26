import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import { UserService } from '../user.service';
import {AlertComponent} from "../../alert/alert.component";

@Component({
  selector: 'app-add_user_dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  departments: string[] = [];
  selectedDepartment: string = "";
  last_name: string = "";
  first_name: string = "";
  username: string = "";
  password: string = "123QWEasd";
  quota:number = 	8388608;
  departments_info: any;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private user_service: UserService,
    public dialog: MatDialog
  ){
    this.user_service.getDepartments().subscribe(data => {
      this.departments_info = data.results;
      this.departments = data.results.map((item: { dept: any; }) => item.dept);
      if (this.departments.length > 0) {
        this.selectedDepartment = this.departments[0];
      }
      console.log(this.departments_info);
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSubmit() {
    // console.log("submit clicked")
    // console.log(this.selectedDepartment)
    console.log()
    this.user_service.createUser(
        {
        "firstname": this.first_name,
        "lastname": this.last_name,
        "username": this.username,
        "pwd": this.password,
        "dept": this.departments_info.filter((item:any) => item.dept === this.selectedDepartment)[0].id,
        "quota": this.quota
      }
    ).subscribe(
      (data) => {
        setTimeout(() => {
          this.dialog.open(AlertComponent, {
            data: {
              icon: 'Check',
              message: 'Create User Success!'
            }
          });
        }, 200);
      },
      (error) => {
        // console.log(error);
        setTimeout(() => {
          throw new Error(error.error);
        }, 200);
      }
    );
    this.dialogRef.close();
  }

  protected readonly console = console;
}
