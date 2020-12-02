import {Component, OnInit} from '@angular/core';
import {BaseService} from './services/base.service';
import {Base} from './models/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  car = {} as Base;
  cars: Base[];

  constructor(private carService: BaseService) {}

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  // ngOnInit() {
  //   this.getCars();
  // }
  // Chama o serviço para obtém todos os carros
  // tslint:disable-next-line:typedef
  // getCars() {
  //   this.carService.getAllBases().subscribe((cars: Base[]) => {
  //     this.cars = cars;
  //   });
  }
  //
  // // deleta um carro
  // deleteCar(car: Base) {
  //   this.carService.deleteCar(car).subscribe(() => {
  //     this.getCars();
  //   });
  // }

  // copia o carro para ser editado.
  // editCar(car: Base) {
  //   this.car = { ...car };
  // }

  // limpa o formulario
  // cleanForm(form: NgForm) {
  //   this.getCars();
  //   form.resetForm();
  //   car = {} as Base;
  // }

