import {Observable} from 'rxjs';
import {Base} from './../models/base';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, map} from 'rxjs/operators';
import {Motorista} from '../models/motorista';
import {Tarefa} from '../tarefas/tarefaModel/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  baseUrl = 'http://localhost:8080/tarefa';
  // baseUrl = 'https://logistcs-controll.herokuapp.com/tarefa';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  public getBase(flag: string): Observable<Base[]> {
    return this.http.get<Base[]>(this.baseUrl.concat('/all') + flag);
  }

  createMotorista(tarefa: Tarefa): any {
    return this.http.post(this.baseUrl.concat('/register'), tarefa);
  }

  // tslint:disable-next-line:typedef
  getTarefasAbertas(s: string) {
    return this.http.get<Base[]>(this.baseUrl.concat('/emAberto'));
  }

  // tslint:disable-next-line:typedef
  getTarefasConcluidas(s: string) {
    return this.http.get<Base[]>(this.baseUrl.concat('/concluda'));
  }

  // tslint:disable-next-line:typedef
  getTarefasAlocadas(s: string) {
    return this.http.get<Base[]>(this.baseUrl.concat('/alocada'));
  }

}
