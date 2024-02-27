import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { OrderlistComponent } from '../../components/orderlist/orderlist.component';
import { IOrder } from '../../interfaces/order.interface';
import { CATEGORY } from '../../interfaces/enums/category.enum';
import { CommonModule, formatCurrency } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderlistComponent, MatIconModule],
  templateUrl: './orders.component.html',
  host: { class: 'w-full' },
})
export class OrdersComponent {
  order: IOrder | null = null;

  printPrice(value: number): string {
    return formatCurrency(value, 'pt', 'R$');
  }

  printCategory(category: string): string {
    switch (category) {
      case 'SANDWICH':
        return 'Sanduíche';
      case 'SIDE':
        return 'Acompanhamento';
      case 'DESSERT':
        return 'Sobremesa';
      case 'DRINK':
        return 'Bebida';
      default:
        return '';
    }
  }

  onSelectOrder(order: IOrder) {
    this.order = order;
  }
}
