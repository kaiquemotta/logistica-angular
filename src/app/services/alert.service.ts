// import {Injectable} from '@angular/core';
// import {Router, NavigationStart} from '@angular/router';
// import {Observable, Subject} from 'rxjs';
//
// @Injectable()
// export class AlertService {
//   private subject = new Subject<any>();
//
//   constructor() {
//   }
//
//   // tslint:disable-next-line:typedef
//   confirm(message: string, siFn: () => void, noFn: () => void) {
//     this.setConfirmation(message, siFn, noFn);
//   }
//
//   // tslint:disable-next-line:typedef
//   setConfirmation(message: string, siFn: () => void, noFn: () => void) {
//     const that = this;
//     this.subject.next({
//       type: 'confirm',
//       text: message,
//       // tslint:disable-next-line:typedef
//       siFn() {
//           that.subject.next(); //this will close the modal
//           siFn();
//         },
//       // tslint:disable-next-line:typedef
//       noFn() {
//         that.subject.next();
//         noFn();
//       }
//     });
//
//   }
//
//   getMessage(): Observable<any> {
//     return this.subject.asObservable();
//   }
// }
