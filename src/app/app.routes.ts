import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { CouriersComponent } from './pages/couriers/couriers.component';
import { AlreadyAuthGuard } from './guards/alreadyauth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AlreadyAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AlreadyAuthGuard] },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: OrdersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'chat',
        component: MessagesComponent,
      },
      {
        path: 'couriers',
        component: CouriersComponent,
      },
    ],
    canActivate: [AuthGuard],
  },
];
