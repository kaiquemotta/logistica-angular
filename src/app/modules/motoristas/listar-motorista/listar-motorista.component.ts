import { DeleteMotoristaComponent } from './../delete-motorista/delete-motorista.component';
import {MotoristaService} from './../../../services/motorista.service';
import {MatSort} from '@angular/material/sort';
import {Motorista} from './../../../models/motorista';
import {Base} from './../../../models/base';
import {AfterViewInit, Component, ViewChild, OnInit, Input} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {EditModalComponent} from '../../../views/home/base/editar-modal/editar-modal.component';
import {DeleteModalComponent} from '../../../views/home/base/delete/delete-modal.component';
import {first} from 'rxjs/operators';
import { EditarMotoristaComponent } from '../editar-motorista/editar-motorista.component';
import { DeleteVeiculoComponent } from 'src/app/veiculos/delete-veiculo/delete-veiculo.component';


@Component({
  selector: 'app-listar-motorista',
  templateUrl: './listar-motorista.component.html',
  styleUrls: ['./listar-motorista.component.css']
})


export class ListarMotoristaComponent implements OnInit {


  @Input() public newData: any;

  @Input() dataSource: MatTableDataSource<Motorista>;

  dataMoto: Motorista[];
  displayedColumns: any[] = ['id', 'nome', 'cpf', 'categoriaCnh', 'dataNascimento', 'celular', 'actions'];
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

  public openDialog(id: number): void {
    const dialogRef = this.dialog.open(EditarMotoristaComponent, {
      width: '250px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  public openDialongConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteMotoristaComponent, {
      width: '250px',
      data: {id}
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}

