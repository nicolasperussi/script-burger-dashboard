import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  route: string = '';
  links: { title: string; icon: string; link: string }[] = [
    {
      title: 'Pedidos',
      icon: 'receipt_long',
      link: '',
    },
    {
      title: 'Produtos',
      icon: 'fastfood',
      link: 'products',
    },
    {
      title: 'Mensagens',
      icon: 'chat',
      link: 'chat',
    },
    {
      title: 'Entregadores',
      icon: 'delivery_dining',
      link: 'couriers',
    },
  ];

  constructor(router: Router, public authService: AuthService) {
    router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        this.route = event.url.replace('/', '');
      });
  }
}
