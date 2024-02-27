import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IOrder } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';

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

  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((data) => {
      this.orders = data;
      // TODO: Uncomment after fixing date problem on api
      // .sort((a, b) => {
      //   return moment(b.moment).valueOf() - moment(a.moment).valueOf();
      // })
      console.log(this.orders);
      this.changeValue(this.orders[0]);
      this.isLoading = false;
    });
  }
}
