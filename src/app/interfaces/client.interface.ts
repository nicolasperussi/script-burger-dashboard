import { IAddress } from './address.interface';
import { IOrder } from './order.interface';

export interface IClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  username: string;
  orders: Array<IOrder>;
  addresses: Array<IAddress>;
}
