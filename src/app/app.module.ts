import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatGridListModule } from "@angular/material/grid-list"
import { MatSortModule } from "@angular/material/sort"
import { MatTableModule } from "@angular/material/table"
import { MatButtonModule} from "@angular/material/button";
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {Component} from '@angular/core';
import {FormGroup, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf, JsonPipe} from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog"
import { DialogComponent } from './user/dialog/dialog.component';
import {MatCardModule} from "@angular/material/card";
import { LoginComponent } from './user/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { TokenInterceptor } from "./token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserComponent,
    ReportComponent,
    HomeComponent,
    DialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatDialogModule,
    MatCardModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
