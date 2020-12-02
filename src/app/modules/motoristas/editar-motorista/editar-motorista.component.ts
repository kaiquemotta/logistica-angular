import { first } from 'rxjs/operators';
import { MessageService } from './../../../services/message.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseService } from 'src/app/services/base.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MotoristaService } from './../../../services/motorista.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-motorista',
  templateUrl: './editar-motorista.component.html',
  styleUrls: ['./editar-motorista.component.css']
})
export class EditarMotoristaComponent implements OnInit {

  bases: any;
  public dataForView: any;

  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    nome: new FormControl(),
    cpf: new FormControl(),
    categoriaCnh: new FormControl(),
    dataNascimento: new FormControl(),
    celular: new FormControl(),
    // base: new FormGroup({
    //   id: new FormControl()
    // })
  });

  constructor(private motoristaService: MotoristaService,
    private baseService: BaseService,
    public dialogRef: MatDialogRef<EditarMotoristaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private messageService: MessageService,
    ) { }

  categorias = [
    {categoriaCnh: 'A'},
    {categoriaCnh: 'B'},
    {categoriaCnh: 'C'},
    {categoriaCnh: 'D'},
    {categoriaCnh: 'E'},
    {categoriaCnh: 'A/B'},
  ];

  ngOnInit(): void {
    this.getDataById();
    this.findAllBases();
    this.getIdMoto();
  }

  findAllBases(): void{
    this.baseService.getAllBases('').subscribe(base =>
      this.bases = base
      );
  }
  public getDataById(): void {
    this.motoristaService.getById(this.data.id)
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
      id: this.dataForView.id,
      nome: this.dataForView.nome,
      cpf: this.dataForView.cpf,
      categoriaCnh: this.dataForView.categoriaCnh,
      dataNascimento: this.dataForView.dataNascimento,
      celular: this.dataForView.celular,
      // base: this.dataForView.base.id,
    });
    console.log('chamou!', this.form.value);
  }

  public submitForm(): any {
    this.motoristaService.updateMotorista(this.form.value)
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

  getIdMoto(){
    this.motoristaService.getById(this.data.id).subscribe(data =>
      console.log('data', data)
      );
    }

}
