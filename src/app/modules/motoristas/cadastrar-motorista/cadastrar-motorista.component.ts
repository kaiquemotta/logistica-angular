import {MessageService} from './../../../services/message.service';
import {MotoristaService} from './../../../services/motorista.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Base} from '../../../models/base';
import {first} from 'rxjs/operators';
import {BaseService} from '../../../services/base.service';

@Component({
  selector: 'app-cadastrar-motorista',
  templateUrl: './cadastrar-motorista.component.html',
  styleUrls: ['./cadastrar-motorista.component.css']
})
export class CadastrarMotoristaComponent implements OnInit {


  constructor(private motoristaService: MotoristaService, private baseService: BaseService,
              private router: Router,
              private messageService: MessageService,
              private fb: FormBuilder) {
  }

  motorista: FormGroup;
  bass: string;
  submitted = false;
  bases: any;
  basesRequest: any[];
  // @ts-ignore
  categorias: Categorias[] = [
    {nomeCat: 'A'},
    {nomeCat: 'B'},
    {nomeCat: 'C'},
    {nomeCat: 'D'},
    {nomeCat: 'E'},
    {nomeCat: 'A/B'},
  ];


  ngOnInit(): void {
    this.motorista = this.fb.group({
      id: [''],
      nome: [''],
      cpf: [''],
      categoriaCnh: [''],
      dataNascimento: [''],
      celular: [''],
      base: this.fb.group({
        id: ['']
      })
    });
    this.findAllBases();

  }

  // tslint:disable-next-line:typedef
  cadastrar() {
    console.log('clicou');
    console.log(this.motorista.value);
    if (this.motorista.invalid) {
      console.log('invalid');
      return;
    }
    //alert('sucesso' + JSON.stringify(this.produto.value.categoria.produtos.nome, null, 4))

    this.motoristaService.createMotorista(this.motorista.value)
      .pipe(first())
      .subscribe(
        () => {
          this.motorista.reset();
          this.messageService.succesMessage();
        },
        err => {
          this.messageService.errorMessage(err);
        }
      ).add(() => {
    });
  }

  // tslint:disable-next-line:typedef
  hasError(field: string) {
    return this.motorista.get(field).errors;
  }

  findAllBases(): void {
    this.baseService.getAllBases('').subscribe(base => {
      this.bases = base;
    });
  }
}
