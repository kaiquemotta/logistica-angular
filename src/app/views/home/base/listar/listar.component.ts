import { EditModalComponent } from './../editar-modal/editar-modal.component';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Base } from '../../../../models/base';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete/delete-modal.component';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  @Input() public newData: any;

  @Input() dataSource: MatTableDataSource<Base>;

  @Output() att = new EventEmitter();

  displayedColumns: string[] = ['id', 'nome', 'cidade', 'uf', 'actions'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public filterValue: any;

  constructor(
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  applyFilter(): void {
    if (this.filterValue !== null && this.filterValue !== undefined && this.filterValue !== '') {
      console.log('filterValue:', this.filterValue);
      console.log('dataSource:', this.dataSource);
      // this.dataSource.filter((filtered) => filtered.nomeBase.includes(this.filterValue));
    } else {
      this.att.emit(true);
    }
  }

  public openDialog(id: number): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '250px',
      data: { id }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.att.emit(true);
    });
  }


  public openDialongConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '250px',
      data: { id }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
