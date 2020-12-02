import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MotoristaService } from './../../../services/motorista.service';
import { MessageService } from './../../../services/message.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-motorista',
  templateUrl: './delete-motorista.component.html',
  styleUrls: ['./delete-motorista.component.css']
})
export class DeleteMotoristaComponent implements OnInit {

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

  constructor(
    public dialogRef: MatDialogRef<DeleteMotoristaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private messageService: MessageService,
    private readonly motoristaService: MotoristaService, private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getDataById();
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

  deleteMotorista(): void {
    const id = this.route.snapshot.paramMap.get(this.data.id);
    this.motoristaService.deleteMotorista(this.data.id).subscribe(() => {
      this.motoristaService.mostrarMessagem('Registro excluido com sucesso!', false);
      // this.router.navigate(['/base']);
    }).add(() => {
      this.dialogRef.close();
      window.location.reload();
    });
  }

  public submitForm(): any {
    this.motoristaService.updateMotorista(this.form.value)
      .pipe(first())
      .subscribe(
        () => {
          this.motoristaService.mostrarMessagem('Cadastro atualizado com sucesso!');
        },
        err => {
          console.log('err:', err);
        }
      );
  }

}
