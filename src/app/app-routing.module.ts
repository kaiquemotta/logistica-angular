import {MotoristaComponent} from './modules/motoristas/motorista/motorista.component';
import {TarefaComponent} from './tarefas/tarefa/tarefa.component';
import {VeiculoComponent} from './veiculos/veiculo/veiculo.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {Base} from './models/base';
import {ListarComponent} from './views/home/base/listar/listar.component';
import {ViagemComponent} from './modules/Viagens/viagem/viagem.component';

const routes: Routes = [
  {path: '', component: HomeComponent}
  , {path: 'veiculos', component: VeiculoComponent}
  , {path: 'motoristas', component: MotoristaComponent}
  , {path: 'tarefas', component: TarefaComponent}
  , {path: 'base', component: ListarComponent}
  , {path: 'viagem', component: ViagemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
