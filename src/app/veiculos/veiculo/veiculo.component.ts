import { Component, OnInit } from '@angular/core';
import {first} from 'rxjs/operators';
import {MotoristaService} from '../../services/motorista.service';
import {VeiculoService} from '../../services/veiculo.service';

@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.css']
})
export class VeiculoComponent implements OnInit {
  public dataSource: any;
  public newData: any;

  constructor(
    private readonly veiculoService: VeiculoService,
  ) {
  }
  ngOnInit(): void {
    this.getVeiculos();
  }

  public getVeiculos(): void {
    this.veiculoService.getAllVeiculo('')
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
