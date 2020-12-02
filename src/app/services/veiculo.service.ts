import { MatSnackBar } from '@angular/material/snack-bar';
import {Veiculo} from '../models/veiculos';
import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  // apiUrl = 'https://logistcs-controll.herokuapp.com/veiculo';
  apiUrl = 'http://localhost:8080/veiculo';

  httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json'
      }
    )
  };

  // errorHandler(e: any): Observable<any> {
  //   this.mostrarMessagem('Ocorreu um erro!', true);
  //   return EMPTY;
  // }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
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


  public getAllVeiculo(flag: string): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl.concat('/all'));
  }

  public updateVeiculo(body: any) {
    return this.http.put(`${this.apiUrl + '/update'}`, body);
  }

  public getById(id: any): any {
    return this.http.get(`${this.apiUrl + '/getOne/' + id}`);
  }


  // create(veiculo: Veiculo): Observable<any> {
  //   return this.http.post<Veiculo>(this.jsonURL, JSON.stringify(veiculo), this.httpOptions).pipe(
  //     map(obj => obj),
  //     catchError(e =>
  //       this.handleError(e)));
  // }

  public create(veiculo: Veiculo): Observable<any> {
    return this.http.post<Veiculo>(this.apiUrl.concat('/register'),
      veiculo, this.httpOptions).pipe(catchError(e =>
        this.handleError(e)
      )
    );
  }

  deleteVeiculo(idVeiculo: any): Observable<Veiculo> {
    const url = `${this.apiUrl + '/delete/' + idVeiculo}`;
    return this.http.delete<Veiculo>(url).pipe(
      map(obj => console.log(obj)),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.mostrarMessagem('Ocorreu um erro!', true);
    return EMPTY;
  }
}
