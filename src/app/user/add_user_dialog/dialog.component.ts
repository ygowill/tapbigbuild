import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import { UserService } from '../user.service';
import {HttpClient} from "@angular/common/http";

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
  quota:number = 1010101;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private user_service: UserService,
    private http: HttpClient
  ){
    this.user_service.getDepartments().subscribe(data => {
      this.departments = data.results.map((item: { dept: any; }) => item.dept);
      if (this.departments.length > 0) {
        this.selectedDepartment = this.departments[0];
      }
    })
  }

  closeDialog(){
    this.dialogRef.close();
  }

  protected readonly onsubmit = onsubmit;

  onSubmit() {
    this.http.post("http://localhost:8080/user/addUsers", {
      users: [
        {
          "firstname": this.first_name,
          "lastname": this.last_name,
          "username": this.username,
          "pwd": this.password,
          "dept": this.selectedDepartment,
          "quota": this.quota
        }
      ]
    })
  }
}
