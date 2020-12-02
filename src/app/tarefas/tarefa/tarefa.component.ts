import {Component, OnInit} from '@angular/core';
import {TarefaService} from '../../services/tarefa.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  public dataSource: any;
  public newData: any;

  constructor(
    private readonly tarefaService: TarefaService,
  ) {
  }

  ngOnInit(): void {
    this.getTrefasAbertas();
    this.getTarefasFechadas();
  }

  public getTrefasAbertas(): void {
    this.tarefaService.getTarefasAbertas('')
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.dataSource = data;
          this.newData = data;
        },
        err => {
          console.log('erro na api:', err);
        }
      );
  }


  public getTarefasAlocadas(): void {
    this.tarefaService.getTarefasAlocadas('')
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.dataSource = data;
          this.newData = data;
        },
        err => {
          console.log('erro na api:', err);
        }
      );
  }
  public getTarefasFechadas(): void {
    this.tarefaService.getTarefasConcluidas('')
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.dataSource = data;
          this.newData = data;
        },
        err => {
          console.log('erro na api:', err);
        }
      );
  }

}
