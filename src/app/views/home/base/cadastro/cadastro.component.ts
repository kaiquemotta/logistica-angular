import { MessageService } from './../../../../services/message.service';
import {Observable} from 'rxjs';
import {Base} from './../../../../models/base';
// import { Observable } from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseService} from '../../../../services/base.service';
import {Router} from '@angular/router';
import {SubjectSubscriber} from 'rxjs/internal/Subject';
import {ConstantPool} from '@angular/compiler';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public dataForView: any;
  base: FormGroup;
  bass: Base;
  submitted = false;

  constructor(private baseService: BaseService,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.base = this.fb.group({
      codBase: ['', [Validators.required, Validators.maxLength(8)]],
      uf: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      nomeBase: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cep: ['', [Validators.required, Validators.maxLength(8)]],
      cidade: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });
  }

  public verifyCep(): void {
    if (this.base.value.cep.length === 8) {
      this.baseService.getAddress(this.base.value.cep)
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


  public fillForm(): any {
    this.base.patchValue({
      id: this.dataForView.id,
      codBase: this.dataForView.codBase,
      uf: this.dataForView.uf,
      nomeBase: this.dataForView.nomeBase,
      cidade: this.dataForView.cidade,
      longitude: this.dataForView.longitude,
      latitude: this.dataForView.latitude,
    });
    console.log('chamou!');
  }

  public fillFormResponse(): any {
    this.base.patchValue({
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

  // public cadastrar() {
  //   if (this.base.invalid) {
  //     return;
  //   }

  //   // this.baseService.create(this.formGroup.value).subscribe(data => this.bass);
  //   this.baseService.create(this.base.value).subscribe(() => {
  //     this.baseService.
  //    this.mes
  //   }).add(() => this.base.reset());
  // }

  cadastrar() {
    console.log('clicou');
    console.log(this.base.value);
    if (this.base.invalid) {
      console.log('invalid');
      return;
    }

    this.baseService.create(this.base.value)
      .pipe(first())
      .subscribe(
        () => {
          this.base.reset();
          this.messageService.succesMessage();
        },
        err => {
          this.messageService.errorMessage(err);
        }
    ).add(() => {
    });
  }

  hasError(field: string) {
    return this.base.get(field).errors;
  }


}
