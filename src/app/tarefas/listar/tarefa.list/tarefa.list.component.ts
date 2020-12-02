import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {MotoristaService} from '../../../services/motorista.service';
import {TarefaService} from '../../../services/tarefa.service';
import {MatTableDataSource} from '@angular/material/table';
import {Motorista} from '../../../models/motorista';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditModalComponent} from '../../../views/home/base/editar-modal/editar-modal.component';
import {DeleteModalComponent} from '../../../views/home/base/delete/delete-modal.component';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa.list.component.html',
  styleUrls: ['./tarefa.list.component.css']
})
export class TarefaListComponent implements OnInit {


  @Input() public newData: any;

  @Input() dataSource: MatTableDataSource<Motorista>;

  displayedColumns: any[] = ['id', 'alteradoPor', 'criandoEm', 'alteradoEm', 'tempoEntrega', 'statusTarefa', 'actions'];
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
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '250px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  public openDialongConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: {id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
