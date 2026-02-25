import { Fund } from '../../dashboard/models/fund';

export const CFund: Fund[] = [
  {
    id: 1,
    nombre: 'FPV_BTG_PACTUAL_RECAUDADORA',
    monto_minimo: 75000,
    categoria: 'FPV',
    estaSuscrito: true,
  },
  {
    id: 2,
    nombre: 'FPV_BTG_PACTUAL_ECOPETROL',
    monto_minimo: 125000,
    categoria: 'FPV',
    estaSuscrito: false,
  },
  { id: 3, nombre: 'DEUDAPRIVADA', monto_minimo: 50000, categoria: 'FIC', estaSuscrito: false },
  { id: 4, nombre: 'FDO-ACCIONES', monto_minimo: 250000, categoria: 'FIC', estaSuscrito: false },
  {
    id: 5,
    nombre: 'FPV_BTG_PACTUAL_DINAMICA',
    monto_minimo: 100000,
    categoria: 'FPV',
    estaSuscrito: false,
  },
  { id: 6, nombre: 'FIC_RENTAFIJA', monto_minimo: 150000, categoria: 'FIC', estaSuscrito: false },
  {
    id: 7,
    nombre: 'FPV_BTG_PACTUAL_GLOBAL',
    monto_minimo: 200000,
    categoria: 'FPV',
    estaSuscrito: false,
  },
  { id: 8, nombre: 'FIC_BALANCEADO', monto_minimo: 100000, categoria: 'FIC', estaSuscrito: false },
  {
    id: 9,
    nombre: 'FPV_BTG_PACTUAL_SEGURA',
    monto_minimo: 80000,
    categoria: 'FPV',
    estaSuscrito: false,
  },
  {
    id: 10,
    nombre: 'FIC_INTERNACIONAL',
    monto_minimo: 300000,
    categoria: 'FIC',
    estaSuscrito: false,
  },
];
