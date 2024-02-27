import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly apiUrl: string = 'http://localhost:3003/orders';

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.apiUrl);
  }
}
