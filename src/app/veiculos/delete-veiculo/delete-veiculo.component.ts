import { MessageService } from './../../services/message.service';
import { first } from 'rxjs/operators';
import { VeiculoService } from './../../services/veiculo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-veiculo',
  templateUrl: './delete-veiculo.component.html',
  styleUrls: ['./delete-veiculo.component.css']
})
export class DeleteVeiculoComponent implements OnInit {

  public dataForView: any;


  public form: FormGroup = new FormGroup({
    idVeiculo: new FormControl(),
    cidade: new FormControl(),
    uf: new FormControl(),
    placa: new FormControl(),
    tipoVeiculo: new FormControl(),
    corVeiculo: new FormControl(),
  });

  constructor(
    public dialogRef: MatDialogRef<DeleteVeiculoComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private messageService: MessageService,
    private readonly veiculoService: VeiculoService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.getDataById();
   console.log(this.data.idVeiculo);
  }

  public getDataById(): void {
    this.veiculoService.getById(this.data.idVeiculo)
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
          this.veiculoService.mostrarMessagem('Cadastro atualizado com sucesso!');
        },
        err => {
          console.log('err:', err);
        }
      );
  }

  deleteVeiculo(): void {
    const idVeiculo = this.route.snapshot.paramMap.get(this.data.idVeiculo);
    this.veiculoService.deleteVeiculo(this.data.idVeiculo).subscribe(() => {
      this.veiculoService.mostrarMessagem('Registro excluido com sucesso!', false);
      // this.router.navigate(['/base']);
    }).add(() => {
      this.dialogRef.close();
      window.location.reload();
    });
  }



}
