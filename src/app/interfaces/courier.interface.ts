import { IOrder } from "./order.interface";

export interface ICourier {
    id: number;
    name: string;
    phone: string;
    orders: Array<IOrder>;
    licensePlate: string;
}