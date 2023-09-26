import {Component, Input} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {UserCredentials} from "../../auth";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logInForm;
  @Input() error: string | null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.logInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  logInUser(): void {
    let username: string = this.logInForm.value["username"]!;
    let password: string = this.logInForm.value["password"]!;
    this.authService.logIn(username, password).subscribe({
        next: (data) => {
          this.authService.setLoggedInUser(data);
          this.router.navigateByUrl(`/user`);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  onSubmit(): void {
    if (this.logInForm.invalid) {
      console.log(this.logInForm.errors);
    } else {
      this.logInUser();
    }
  }
}
