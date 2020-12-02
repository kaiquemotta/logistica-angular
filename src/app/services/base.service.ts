import {Base} from './../models/base';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {catchError, first, map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Motorista} from '../models/motorista';


// import {ResponsePageable} from '../models/ResponsePageable';
@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // baseUrl = 'https://logistcs-controll.herokuapp.com/base/';
  baseUrl = 'http://localhost:8080/base/';
  baseUtil = 'http://localhost:8080/util/getAddress/';
  httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json'
      }
    )
  };

  errorHandler(e: any): Observable<any> {
    this.mostrarMessagem('Ocorreu um erro!', true);
    return EMPTY;
  }

  mostrarMessagem(msg: string, isError: boolean = false): void {
    console.log(this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-sucess']
    }));
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  public getAllBases(flag: string): Observable<Base[]> {
    return this.http.get<Base[]>(`${this.baseUrl + 'all'}`);
  }

  // public insert(base: Base): Observable<Base> {
  //   return this.http.post<Base>(this.apiUrl.concat('/register'), base);
  // }

  create(base: Base): any {
    return this.http.post(this.baseUrl.concat('register'), base);
  }

  public getById(id: any): any {
    return this.http.get(`${this.baseUrl + 'getOne/' + id}`);
  }

  public updateBase(body: any) {
    return this.http.put(`${this.baseUrl + 'update'}`, body);
  }

  public getAddress(cep: any) {
    return this.http.get(`${this.baseUtil + cep}`);
  }

  // create(base: Base): Observable<Base> {
  //   return this.http.post<Base>(this.apiUrl.concat('/register'), base);
  // }
  deleteBase(id: string): Observable<Base> {
    const url = `${this.baseUrl + 'delete/' + id}`;
    return this.http.delete<Base>(url).pipe(
      map(obj => console.log(obj)),
      catchError(e => this.errorHandler(e))
    );
  }
}
