import {MessageService} from './services/message.service';
import {EditModalComponent} from './views/home/base/editar-modal/editar-modal.component';
import {CadastrarMotoristaComponent} from './modules/motoristas/cadastrar-motorista/cadastrar-motorista.component';
import {MotoristaComponent} from './modules/motoristas/motorista/motorista.component';
import {ListarMotoristaComponent} from './modules/motoristas/listar-motorista/listar-motorista.component';
import {VeiculoComponent} from './veiculos/veiculo/veiculo.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './views/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {BaseComponent} from './views/home/base/base.component';
import {MatTabsModule} from '@angular/material/tabs';
import {CadastroComponent} from './views/home/base/cadastro/cadastro.component';
import {ListarComponent} from './views/home/base/listar/listar.component';
import {VincularComponent} from './views/home/base/vincular/vincular.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {CadastrarVeiculoComponent} from './veiculos/cadastrar-veiculo/cadastrar-veiculo.component';
import {ListarVeiculoComponent} from './veiculos/listar-veiculo/listar-veiculo.component';
import {AtribuirTarefaComponent} from './tarefas/atribuir-tarefa/atribuir-tarefa.component';
import {TarefaComponent} from './tarefas/tarefa/tarefa.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {DeleteModalComponent} from './views/home/base/delete/delete-modal.component';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import { EditarVeiculoComponent } from './veiculos/editar-veiculo/editar-veiculo.component';

import {ViagemComponent} from './modules/Viagens/viagem/viagem.component';
import {ViagemListarComponent} from './modules/Viagens/listar/viagem.listar/viagem.listar.component';
import {TarefaListComponent} from './tarefas/listar/tarefa.list/tarefa.list.component';
import { EditarMotoristaComponent } from './modules/motoristas/editar-motorista/editar-motorista.component';
import { DeleteVeiculoComponent } from './veiculos/delete-veiculo/delete-veiculo.component';
import { DeleteMotoristaComponent } from './modules/motoristas/delete-motorista/delete-motorista.component';
import {MatCheckboxModule} from '@angular/material/checkbox';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

const material = [
  MatDialogModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatTabsModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatInputModule,
  MatSortModule,
  MatSelectModule,
  MatSnackBarModule,

];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseComponent,
    CadastroComponent,
    ListarComponent,
    VincularComponent,
    VeiculoComponent,
    ListarMotoristaComponent,
    MotoristaComponent,
    CadastrarMotoristaComponent,
    CadastrarVeiculoComponent,
    ListarVeiculoComponent,
    AtribuirTarefaComponent,
    TarefaComponent,
    EditModalComponent,
    DeleteModalComponent,
    EditarVeiculoComponent,
    ViagemComponent,
    ViagemListarComponent,
    TarefaListComponent,
    EditarMotoristaComponent,
    DeleteVeiculoComponent,
    DeleteMotoristaComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    MatFormFieldModule, MatInputModule,
    material, MatCheckboxModule
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
