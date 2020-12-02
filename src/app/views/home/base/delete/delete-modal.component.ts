import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { EditModalComponent } from '../editar-modal/editar-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
})


export class DeleteModalComponent implements OnInit {

  public dataForView: any;

  public form: FormGroup = new FormGroup({
    id: new FormControl(),
    codBase: new FormControl(),
    uf: new FormControl(),
    nomeBase: new FormControl(),
    cidade: new FormControl(),
    cep: new FormControl(),
    longitude: new FormControl(),
    latitude: new FormControl(),
  });



  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly baseService: BaseService, private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getDataById();
  }

  public getDataById(): void {
    this.baseService.getById(this.data.id)
      .pipe(first())
      .subscribe(
        (res: any) => {
          console.log('res:', res);
          this.dataForView = res;
          this.fillForm();
        },
        err => {
          console.log('err:', err);
        }
      );
  }

  public fillForm(): any {
    this.form.patchValue({
      id: this.dataForView.id,
      codBase: this.dataForView.codBase,
      uf: this.dataForView.uf,
      cep: this.dataForView.cep,
      nomeBase: this.dataForView.nomeBase,
      cidade: this.dataForView.cidade,
      longitude: this.dataForView.longitude,
      latitude: this.dataForView.latitude,
    });
    console.log('chamou!');
  }

  public submitForm(): any {
    this.baseService.updateBase(this.form.value)
      .pipe(first())
      .subscribe(
        () => {
          this.baseService.mostrarMessagem('Cadastro atualizado com sucesso!');
        },
        err => {
          console.log('err:', err);
        }
      );
  }

  public verifyCep(): void {
    if (this.form.value.cep.length === 8) {
      this.baseService.getAddress(this.form.value.cep)
        .pipe(first())
        .subscribe(
          (res) => {
            console.log('res:', res),
              this.successCep(res);
          },
          err => {
            console.log('error:', err);
          }
        );
    }
  }

  public successCep(res: any): any {
    console.log('res success:', res);
  }

  deleteBase(): void {
    const id = this.route.snapshot.paramMap.get(this.data.id);
    this.baseService.deleteBase(this.data.id).subscribe(() => {
      this.baseService.mostrarMessagem('Registro excluido com sucesso!', false);
      // this.router.navigate(['/base']);
    }).add(() => {
      this.dialogRef.close();
      window.location.reload()
    })
  }
}
