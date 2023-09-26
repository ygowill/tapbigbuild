import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {}
  logout() {
    localStorage.removeItem('userData');
    this.router.navigateByUrl("login");
  }
}
