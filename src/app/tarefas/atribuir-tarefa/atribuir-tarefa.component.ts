import {MatGridListModule} from '@angular/material/grid-list';
import {BaseModel} from './../tarefaModel/base.model';
import {Tarefa} from './../tarefaModel/tarefa';
import {Motorista} from './../../models/motorista';
import {Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {first} from 'rxjs/operators';
import {BaseService} from '../../services/base.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MotoristaService} from '../../services/motorista.service';
import {VeiculoService} from '../../services/veiculo.service';
import {TarefaService} from '../../services/tarefa.service';
import {MessageService} from '../../services/message.service';


@Component({
  selector: 'app-atribuir-tarefa',
  templateUrl: './atribuir-tarefa.component.html',
  styleUrls: ['./atribuir-tarefa.component.css']
})


export class AtribuirTarefaComponent implements OnInit {
  public base: FormGroup;
  public submitted = false;
  public nome: Motorista['nome'];
  public nomeView: string;
  public dataForView: any;
  public tarefa: FormGroup;
  request: any;

  ngOnInit(): void {
    this.tarefa = this.fb.group({
      carga: this.fb.group({
        notaFiscal: [''],
        volumeCarga: [''],
        peso: ['']
      }),
      remetente: this.fb.group({
        cpfCnpj: [''],
        nomeRemetente: [''],
        cgcRemetente: [''],
        endereco: [''],
        estado: [''],
        cep: [''],
        numero: [''],
        referencia: [''],
        rua: [''],
        bairro: [''],
        observacao: [''],
        latitude: [''],
        longitude: [''],
        placeId: [''],
      }),
      destinatario: this.fb.group({
        cpfCnpj: [''],
        nomeDestinatario: [''],
        cgcDestinatario: [''],
        endereco: [''],
        estado: [''],
        cep: [''],
        numero: [''],
        referencia: [''],
        rua: [''],
        bairro: [''],
        observacao: [''],
        latitude: [''],
        longitude: [''],
        placeId: [''],
      })
    });
  }

  public verifyCep(type: 'R' | 'D'): void {
    if (type === 'D') {
      if (this.tarefa.value.destinatario.cep.length === 8) {
        this.baseService.getAddress(this.tarefa.value.destinatario.cep)
          .pipe(first())
          .subscribe(
            (res) => {
              console.log('res:', res),
                this.successCep(res, type);
            },
            err => {
              console.log('error:', err);
            });
      }
    } else if (type === 'R') {
      if (this.tarefa.value.remetente.cep.length === 8) {
        this.baseService.getAddress(this.tarefa.value.remetente.cep)
          .pipe(first())
          .subscribe(
            (res) => {
              console.log('res:', res),
                this.successCep(res, type);
            },
            err => {
              console.log('error:', err);
            });
      }
    }
  }

  public successCep(res: any, type: 'R' | 'D'): any {
    console.log(type);
    if (type === 'R') {
      this.tarefa.patchValue({
        remetente: {
          latitude: res.latitude,
          longitude: res.longitude,
          estado: res.uf,
          cidade: res.cidade,
          endereco: res.endereco,
          bairro: res.bairro
        }
      });
    } else if (type === 'D') {
      this.tarefa.patchValue({
        destinatario: {
          latitude: res.latitude,
          longitude: res.longitude,
          estado: res.uf,
          cidade: res.cidade,
          endereco: res.endereco,
          bairro: res.bairro
        }
      });
    }
  }

  bases: BaseModel[] = [
    {baseView: 'Base de Teste'},
    {baseView: 'Base dos Gado'},
    {baseView: 'Base do Combo Box'}
  ];

  constructor(private baseService: BaseService,
              private motoristaSerice: MotoristaService,
              private veiculoService: VeiculoService,
              private tarefaService: TarefaService,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService) {
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

  // finAllBses(): void {
  //   this.baseService.getAllBases('').subscribe(base => {
  //     this.basess = base;
  //   });
  // }
  //
  // findAllMototista(): void {
  //   this.motoristaSerice.getAllMotorista('').subscribe(mot => {
  //     this.motoristas = mot;
  //   });
  // }
  //
  // findAllVeiculos(): void {
  //   this.veiculoService.getAllVeiculo('').subscribe(vei => {
  //     this.veiculos = vei;
  //   });
  // }

  submit() {
    console.log('clicou');
    console.log(this.tarefa.value);
    // if (this.tarefa.invalid) {
    //   console.log('invalid');
    //   return;
    // }
    this.tarefaService.createMotorista(this.tarefa.value)
      .pipe(first())
      .subscribe(
        () => {
          this.tarefa.reset();
          this.messageService.succesMessage();
        },
        err => {
          this.messageService.errorMessage(err);
        }
      ).add(() => {
    });
  }

}
