import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import stomp from 'stompjs';
import sockjs from 'sockjs-client';
import moment from 'moment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orderlist.component.html',
})
export class OrderlistComponent implements OnInit {
  orders: Array<IOrder> = [];
  isLoading: boolean = true;

  @Output() selectedOrder = new EventEmitter();

  changeValue(order: IOrder) {
    this.selectedOrder.emit(order);
  }

  getOrderTime(order: IOrder): string {
    let now = moment();
    let orderDate = moment(order.moment);

    if (now.diff(orderDate, 'minutes') > 1) {
      return orderDate.format('HH:mm');
    }

    return 'now';
  }

  showOrders: 'ACTIVE' | 'FINISHED' = 'ACTIVE';
  changeShowOrders(filter: typeof this.showOrders): void {
    this.showOrders = filter;
  }

  currentOrders(): Array<IOrder> {
    if (this.showOrders === 'ACTIVE') return this.getActiveOrders();

    return this.getFinishedOrders();
  }

  getActiveOrders(): Array<IOrder> {
    return this.orders.filter(
      (order: IOrder) =>
        order.status === 'IN_PRODUCTION' ||
        order.status === 'IN_TRANSIT' ||
        order.status === 'WAITING'
    );
  }

  getFinishedOrders(): Array<IOrder> {
    return this.orders.filter(
      (order: IOrder) =>
        order.status === 'CANCELED' || order.status === 'DELIVERED'
    );
  }

  private stompClient;

  constructor(private orderService: OrdersService) {
    const ws = new sockjs('http://localhost:3003/scriptburger-ws');
    this.stompClient = stomp.over(ws);
    this.stompClient.debug = () => {};
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe('/topic/orders', (message) => {
        if (message.body) {
          if (this.orders) {
            this.orders.unshift(JSON.parse(message.body));
          } else {
            this.orders = [JSON.parse(message.body)];
          }
        }
      });
    });
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      if (data) {
        this.orders = data.sort((a, b) => {
          return moment(b.moment).valueOf() - moment(a.moment).valueOf();
        });
        this.changeValue(this.orders[0]);
      }
      this.isLoading = false;
    });
  }
}
