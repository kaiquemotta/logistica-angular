import {Base} from './base';

export class Motorista {
  id: number;
  nome: string;
  cpf: string;
  categoriaCnh: string;
  dataNascimento: Date;
  celular: string;
  base: Base[];
  tarefas: [];
  criandoEm: string;
  criadoEm: string;
}
