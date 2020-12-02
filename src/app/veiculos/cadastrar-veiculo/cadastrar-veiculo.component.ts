import { ESTADOS } from './../mock-uf-veiculo';
//import { Swal } from 'sweetalert2';
import { first, map } from 'rxjs/operators';
import { MessageService } from './../../services/message.service';
import { BaseService } from 'src/app/services/base.service';
import {Veiculo} from '../../models/veiculos';
import {VeiculoService} from '../../services/veiculo.service';
import { Component, Input, OnInit, Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ListarVeiculoComponent } from '../listar-veiculo/listar-veiculo.component';



@Component({
  selector: 'app-cadastrar-veiculo',
  templateUrl: './cadastrar-veiculo.component.html',
  styleUrls: ['./cadastrar-veiculo.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class CadastrarVeiculoComponent implements OnInit {

  formGroup: FormGroup;
  bases: any;
  veiculo: Veiculo;
  submitted = false;
  listaVeiculos: ListarVeiculoComponent;
  estados = ESTADOS;

//BRANCO, PRETO, PRATA, AMARELO, ROXO, VERDE, AZUL
     cores = [
    {corVeiculo: 'PRETO'},
    {corVeiculo: 'BRANCO'},
    {corVeiculo: 'PRATA'},
    {corVeiculo: 'AMARELO'},
    {corVeiculo: 'ROXO'},
    {corVeiculo: 'VERDE'},
    {corVeiculo: 'AZUL'}
  ];

   tipos = [
    {tipo: 'TRACAO'},
    {tipo: 'REBOQUE'},
  ];




  constructor(private router: Router,
              private fb: FormBuilder,
              private veiculoService: VeiculoService,
              private baseService: BaseService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      //id: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cidade: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      placa: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      uf: [''],
      corVeiculo: [''],
      tipoVeiculo: [''],
      base: this.fb.group({
        id: [null]
      }),
    });


    this.findAllBases();

  }


  // tslint:disable-next-line:typedef
  hasError(field: string) {
    return this.formGroup.get(field).errors;
  }
  // tslint:disable-next-line:typedef;

  // cadastrar() {
  //   this.submitted = true;
  //   console.log(this.formGroup.value);
  //   if (this.formGroup.invalid){
  //     console.log('Erro');
  //     this.veiculoService.mostrarMessagem('Erro ao cadastrar Veículo');
  //      //
  //     }
  //     else{
  //       // console.log('Funciona', data)
  //       this.veiculoService.create(this.formGroup.value).subscribe(
  //         // data => {console.log(data)},
  //        () => { this.veiculoService.mostrarMessagem('Veículo criado com sucesso!')},
  //       );
  //     }
  //   }

  cadastrar() {
    console.log('clicou');
    console.log(this.formGroup.value);
    if (this.formGroup.invalid) {
      console.log('invalid');
      return;
    }
    //alert('sucesso' + JSON.stringify(this.produto.value.categoria.produtos.nome, null, 4))

    this.veiculoService.create(this.formGroup.value)
      .pipe(first())
      .subscribe(
        () => {
          this.formGroup.reset();
          this.messageService.succesMessage();
        },
        err => {
          this.messageService.errorMessage(err);
        }
    ).add(() => {
    });
  }

    findAllBases(): void{
      this.baseService.getAllBases('').subscribe(base =>
        this.bases = base
        );
    }

}
