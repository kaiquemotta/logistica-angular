import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditModalComponent} from '../../../../views/home/base/editar-modal/editar-modal.component';
import {DeleteModalComponent} from '../../../../views/home/base/delete/delete-modal.component';
import {MotoristaService} from '../../../../services/motorista.service';
import {VeiculoService} from '../../../../services/veiculo.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ViagemService} from '../../../../services/viagem.service';
import {delay, first} from 'rxjs/operators';
import {MessageService} from '../../../../services/message.service';

@Component({
  selector: 'app-viagem-listar',
  templateUrl: './viagem.listar.component.html',
  styleUrls: ['./viagem.listar.component.css']
})

export class ViagemListarComponent implements OnInit {

  motoristas: any;
  veiculos: any;
  selected = 'option2';
  viagem: FormGroup;

  @Input() public newData: any;
  @Input() dataSource: MatTableDataSource<FormGroup>;
  displayedColumns: any[] = ['id', 'alteradoPor', 'criandoEm', 'alteradoEm', 'tempoEntrega', 'statusTarefa', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, public motoristaService: MotoristaService, public veiculoService: VeiculoService, private fb: FormBuilder, public viagemService: ViagemService, public  messagemSerice: MessageService) {
  }

  // tslint:disable-next-line:typedef
  onCheckboxChange(e) {
    console.log(e.source);
    const checkArray: FormArray = this.viagem.get('tarefas') as FormArray;
    if (e.source.checked) {
      checkArray.push(new FormControl(e.source.value));
      console.log(this.viagem.get('tarefas').value[0].id);
    } else {
      let i;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value.id === e.source.value.id) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  ngOnInit(): void {
    console.log('dataSource:', this.dataSource);
    this.viagem = this.fb.group({
      id: [''],
      motorista: this.fb.group({
        id: [''],
      }),
      veiculo: this.fb.group({
        idVeiculo: [''],
      }),
      tarefas: this.fb.array([])
    });
    this.findAllMotoristas();
    this.findAllVeiculos();
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

  findAllMotoristas(): void {
    this.motoristaService.getAllMotorista('').subscribe(motoristas => {
      this.motoristas = motoristas;
    });
  }

  findAllVeiculos(): void {
    this.veiculoService.getAllVeiculo('').subscribe(veic => {
      this.veiculos = veic;
    });
  }

  // tslint:disable-next-line:typedef
  submitForm() {
    console.log(this.viagem.get('tarefas'));
    console.log('clicou');
    console.log(this.viagem.value);
    if (this.viagem.invalid) {
      console.log('invalid');
      return;
    }

    this.viagemService.create(this.viagem.value)
      .pipe(first())
      .subscribe(
        async () => {
          this.viagem.reset();
          this.messagemSerice.succesMessage();
          await delay(10);
          location.reload();

        },
        err => {
          this.messagemSerice.errorMessage(err);
        }
      ).add(() => {
    });
  }
}

