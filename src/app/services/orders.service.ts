import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  nextStep(orderId: number): void {
    this.http.patch(`${this.apiUrl}/${orderId}`, null).subscribe();
  }

  cancelOrder(orderId: number): void {
    this.http.patch(`${this.apiUrl}/cancel/${orderId}`, null).subscribe();
  }
}
