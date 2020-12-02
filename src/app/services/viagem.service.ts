import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Motorista} from '../models/motorista';
import {Viagem} from '../models/viagem';
import {Base} from '../models/base';

@Injectable({
  providedIn: 'root'
})
export class ViagemService {

  // apiUrl = 'https://logistcs-controll.herokuapp.com/viagem';
  apiUrl = ' http://localhost:8080/viagem';

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

  public getAllMotorista(flag: string): Observable<Viagem[]> {
    return this.http.get<Motorista[]>(this.apiUrl.concat('/all'));
  }

  createMotorista(viagem: Viagem): any {
    return this.http.post(this.apiUrl.concat('/register'), viagem);
  }

  create(viagem: Viagem): any {
    return this.http.post(this.apiUrl.concat('/register'), viagem);
  }
}
