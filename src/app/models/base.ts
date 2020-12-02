import { Veiculo } from './veiculos';

export class Base {
  id: number;
  nomeBase: string;
  codBase: string;
  cidade: string;
  uf: string;
  longitude: string;
  latitude: string;
  veiculos: Veiculo[];
  criadoEm: string;
  criadoPor: string;

}
