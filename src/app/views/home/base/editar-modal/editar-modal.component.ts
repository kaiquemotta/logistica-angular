import {MessageService} from './../../../../services/message.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {first} from 'rxjs/operators';
import {BaseService} from 'src/app/services/base.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './editar-modal.component.html',
})

export class EditModalComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly baseService: BaseService,
    private messageService: MessageService
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
          this.messageService.succesMessage();
        },
        err => {
          this.messageService.errorMessage(err);
        }
      ).add(() => {
      this.dialogRef.close();
    });
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

  public fillFormResponse(): any {
    this.form.patchValue({
      uf: this.dataForView.uf,
      cidade: this.dataForView.cidade,
      longitude: this.dataForView.longitude,
      latitude: this.dataForView.latitude,
    });
    console.log('chamou!');
  }

  public successCep(res: any): any {
    console.log('res success:', res);
    this.dataForView = res;
    this.fillFormResponse();
  }

}
