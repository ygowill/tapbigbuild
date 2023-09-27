import { NgModule } from '@angular/core';
import { AuthGuard } from "./auth.guard";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ReportComponent } from './report/report.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'home',
  //   component: HomeComponent,
  //   canActivate: [AuthGuard]
  // },
  {
    path: '',
    component: UserComponent,
    // canActivate: [AuthGuard],
    children: ['', 'user'].map(path => ({
      path,
      component: UserComponent
    }))
  },
  {
    path: 'report',
    component: ReportComponent,
    // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
