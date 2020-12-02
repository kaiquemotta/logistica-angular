import {Veiculo} from '../models/veiculos';
import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, map} from 'rxjs/operators';
import {Motorista} from '../models/motorista';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MotoristaService {

  // apiUrl = 'https://logistcs-controll.herokuapp.com/motorista';
  apiUrl = ' http://localhost:8080/motorista';


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
  }

  constructor(private http: HttpClient) {
  }

  public getAllMotorista(flag: string): Observable<Motorista[]> {
    return this.http.get<Motorista[]>(this.apiUrl.concat('/all'));
  }

  public getById(id: any): any {
    return this.http.get(`${this.apiUrl + '/getOne/' + id}`);
  }

  public updateMotorista(body: any){
    return this.http.put(`${this.apiUrl + '/update'}`, body);
  }

  createMotorista(motorista: Motorista): any {
    return this.http.post(this.apiUrl.concat('/register'), motorista);
  }

  deleteMotorista(id: string): Observable<Motorista> {
    const url = `${this.apiUrl + '/delete/' + id}`;
    return this.http.delete<Motorista>(url).pipe(
      map(obj => console.log(obj)),
      catchError(e => this.errorHandler(e))
    );
  }

}
