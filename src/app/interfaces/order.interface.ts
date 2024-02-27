import { IAddress } from './address.interface';
import { IClient } from './client.interface';
import { ICourier } from './courier.interface';
import { ORDER_STATUS } from './enums/orderstatus.enum';
import { IProduct } from './product.interface';

export interface IOrder {
  id: number;
  moment: string;
  status: ORDER_STATUS;
  client?: IClient;
  courier?: ICourier;
  items: Array<{
    quantity: number;
    totalPrice: number;
    product: IProduct;
  }>;
  deliveryAddress: IAddress;
  totalPrice: number;
}
