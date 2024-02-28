import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { OrderlistComponent } from '../../components/orderlist/orderlist.component';
import { IOrder } from '../../interfaces/order.interface';
import { CATEGORY } from '../../interfaces/enums/category.enum';
import { CommonModule, formatCurrency } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../../components/button/button.component';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderlistComponent, MatIconModule, ButtonComponent],
  templateUrl: './orders.component.html',
  host: { class: 'w-full' },
})
export class OrdersComponent {
  order: IOrder | null = null;

  constructor(private orderService: OrdersService) {}

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

  openAddress(): void {
    window.open(`https://www.google.com/maps/place/${this.order?.deliveryAddress.street}+${this.order?.deliveryAddress.number}`, '_blank')!.focus();
  }

  nextStep(): void {
    this.orderService.nextStep(this.order!.id);
    window.location.reload();
  }

  cancelOrder(): void {
    this.orderService.cancelOrder(this.order!.id);
    window.location.reload();
  }
}
