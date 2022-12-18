import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$: Observable<any>;

  constructor(authService: AuthService, orderService: OrderService) {
    this.orders$ = authService.user$.pipe(switchMap(user => orderService.getOrdersByUser(user?.uid as string)));
  }
}
