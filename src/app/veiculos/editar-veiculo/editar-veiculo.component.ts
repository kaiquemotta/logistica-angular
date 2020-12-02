import { ListarVeiculoComponent } from './../listar-veiculo/listar-veiculo.component';
import { ESTADOS } from './../mock-uf-veiculo';
import { BaseService } from './../../services/base.service';
import { MessageService } from './../../services/message.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditModalComponent } from './../../views/home/base/editar-modal/editar-modal.component';
import { first } from 'rxjs/operators';
import { VeiculoService } from './../../services/veiculo.service';
import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-editar-veiculo',
  templateUrl: './editar-veiculo.component.html',
  styleUrls: ['./editar-veiculo.component.css']
})
export class EditarVeiculoComponent implements OnInit {

  public dataForView: any;
  bases: any;
  estados = ESTADOS;
  listarVeiculo: ListarVeiculoComponent;
  veic: any;

  //Dados Mockados
  tipos = [
    {tipoVeiculo: 'TRACAO'},
    {tipoVeiculo: 'REBOQUE'}
  ];
  cores = [
    {corVeiculo: 'PRETO'},
    {corVeiculo: 'BRANCO'},
    {corVeiculo: 'PRATA'},
    {corVeiculo: 'AMARELO'},
    {corVeiculo: 'ROXO'},
    {corVeiculo: 'VERDE'},
    {corVeiculo: 'AZUL'}
  ];

  public form: FormGroup = new FormGroup({
    idVeiculo: new FormControl(),
    cidade: new FormControl(),
    uf: new FormControl(),
    placa: new FormControl(),
    tipoVeiculo: new FormControl(),
    corVeiculo: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<EditarVeiculoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private readonly veiculoService: VeiculoService,
    private messageService: MessageService,
    private baseService: BaseService) { }

  ngOnInit(): void {
    this.getDataById();
    this.findAllBases();

    this.getIdVeic();
  }

  public getDataById(): void {
    this.veiculoService.getById(this.data.idVeiculo)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dataForView = res;
          this.fillForm();
        },
        err => {
          this.messageService.errorMessage(err);
        }
      );
  }

  public fillForm(): any {
    this.form.patchValue({
      idVeiculo: this.dataForView.idVeiculo,
      cidade: this.dataForView.cidade,
      uf: this.dataForView.uf,
      placa: this.dataForView.placa,
      tipoVeiculo: this.dataForView.tipoVeiculo,
      corVeiculo: this.dataForView.corVeiculo,
    });
    console.log('chamou!', this.form.value);
  }




  public submitForm(): any {
    this.veiculoService.updateVeiculo(this.form.value)
      .pipe(first())
      .subscribe(
        () => {
          this.messageService.succesMessage();
        },
        err => {
          this.messageService.errorMessage(err);
        }
      ).add(() => {
        this.dialogRef.close();
      });
  }

  findAllBases(): void{
    this.baseService.getAllBases('').subscribe(base =>
      this.bases = base
      );
  }

  getIdVeic(){
    this.veiculoService.getById(this.data.idVeiculo).subscribe(data =>
      console.log('data', data)
      );
    }

}
