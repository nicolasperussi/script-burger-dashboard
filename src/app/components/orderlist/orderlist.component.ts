import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import stomp from 'stompjs';
import sockjs from 'sockjs-client';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [],
  templateUrl: './orderlist.component.html',
})
export class OrderlistComponent implements OnInit {
  orders: Array<IOrder> = [];
  isLoading: boolean = true;

  @Output() selectedOrder = new EventEmitter();

  changeValue(order: IOrder) {
    this.selectedOrder.emit(order);
  }

  private stompClient;

  constructor(private orderService: OrdersService) {
    this.orders = [];
    const ws = new sockjs('http://localhost:3003/scriptburger-ws');
    this.stompClient = stomp.over(ws);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/orders', (message) => {
        if (message.body) {
          if (this.orders) {
            this.orders.push(JSON.parse(message.body));
          } else {
            this.orders = [JSON.parse(message.body)];
          }
        }
      });
    });
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
      // TODO: Uncomment after fixing date problem on api
      // .sort((a, b) => {
      //   return moment(b.moment).valueOf() - moment(a.moment).valueOf();
      // })
      if (data) {
        this.changeValue(this.orders[0]);
      }
      this.isLoading = false;
    });
  }
}
