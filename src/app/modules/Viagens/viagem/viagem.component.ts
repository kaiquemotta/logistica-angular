import {Component, OnInit} from '@angular/core';
import {MotoristaService} from '../../../services/motorista.service';
import {first} from 'rxjs/operators';
import {TarefaService} from '../../../services/tarefa.service';

@Component({
  selector: 'app-viagem',
  templateUrl: './viagem.component.html',
  styleUrls: ['./viagem.component.css']
})
export class ViagemComponent implements OnInit {
  public dataSource: any;
  public newData: any;

  constructor(
    private readonly tarefaService: TarefaService,
  ) {
  }

  ngOnInit(): void {
    this.getTarefasAbertas();
  }

  public getTarefasAbertas(): void {
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
}
