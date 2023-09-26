import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';
import {Observable, Subject} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

@Injectable()
export class AlertService extends ErrorHandler{
  constructor(private dialog: MatDialog, private ngZone: NgZone) {
    super();
  }

  override handleError(err: any): void {
    // console.error(err);

    /*
    this.dialog.open(AlertDialog, {
      data: { icon: 'Error', message: err.message, buttonText: 'Uh oh!' }
    });
    */

    // solution as provided by Vugar Abdullayev to Stack Overflow question
    // https://stackoverflow.com/questions/69138275/
    // https://github.com/angular/components/issues/7550#issuecomment-345250406
    this.ngZone.run(() => {
      this.dialog.open(AlertComponent, {
        data: { icon: 'Error', message: err.message, buttonText: 'Uh oh!' },
      });
    });
  }
}
