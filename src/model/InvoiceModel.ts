import { Game } from './GameModel';
import { User } from './UsersModel';

export type InvoiceModel = {
  sysIdOrder: number;
  orderCode: string;
  orderDate: string;
  paymentStatus: boolean;
  totalPayment: number;
  sysIdProduct: number;
  sysIdUser: number;
  slug: string;
  quantity: number;
  price: number;
  gameDTO: Game;
  usersDTO: User;
};