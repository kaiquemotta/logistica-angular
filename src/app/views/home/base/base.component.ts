import {Component, OnInit} from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {

  public dataSource: any;
  public newData: any;

  constructor(
    private readonly baseService: BaseService,
  ) { }

  ngOnInit(): void {
    this.getBases();
  }

  public getBases(): void {
    this.baseService.getAllBases('')
    .pipe(first())
    .subscribe(
      (data: any) => {
        this.dataSource = data;
        this.newData = data;
      },
      err => { console.log('erro na api:', err); }
    );
  }

}
