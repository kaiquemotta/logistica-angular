import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {BaseService} from '../../../services/base.service';
import {MotoristaService} from '../../../services/motorista.service';

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.css']
})
export class MotoristaComponent implements OnInit {
  public dataSource: any;
  public newData: any;

  constructor(
    private readonly motoristaService: MotoristaService,
  ) {
  }

  ngOnInit(): void {
    this.getMotoristass();
  }

  public getMotoristass(): void {
    this.motoristaService.getAllMotorista('')
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
