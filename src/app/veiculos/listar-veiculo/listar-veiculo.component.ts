import { EditarVeiculoComponent } from './../editar-veiculo/editar-veiculo.component';
import {VeiculoService} from '../../services/veiculo.service';
import {Veiculo} from '../../models/veiculos';
import {Base} from './../../models/base';
import {Component, ViewChild, OnInit, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Motorista} from '../../models/motorista';
import {MatDialog} from '@angular/material/dialog';
import { DeleteVeiculoComponent } from '../delete-veiculo/delete-veiculo.component';

@Component({
  selector: 'app-listar-veiculo',
  templateUrl: './listar-veiculo.component.html',
  styleUrls: ['./listar-veiculo.component.css']
})
export class ListarVeiculoComponent implements OnInit {


  @Input() public newData: any;
  @Input() dataSource: MatTableDataSource<Veiculo>;

  veiculos: Veiculo[];
  displayedColumns: any[] = ['idVeiculo', 'cidade', 'placa', 'uf', 'corVeiculo', 'tipoVeiculo', 'statusVeiculo', 'acoes'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(public dialog: MatDialog
  ) {
  }


  ngOnInit(): void {
    console.log('dataSource:', this.dataSource);
  }


  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public openDialog(idVeiculo: number): void {
    const dialogRef = this.dialog.open(EditarVeiculoComponent, {
      width: '250px',
      data: {idVeiculo}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  public openDialongConfirm(idVeiculo: number): void {
    const dialogRef = this.dialog.open(DeleteVeiculoComponent, {
      width: '250px',
      data: {idVeiculo}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
