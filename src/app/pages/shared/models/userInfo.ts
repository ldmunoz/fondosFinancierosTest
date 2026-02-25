export interface UserInfo {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  saldo: number;
  preferenciaNotificacion: string; // 'email' | 'sms'
  fondosSuscritos: number[]; // se llenará con los IDs de los fondos activos
}
