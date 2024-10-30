import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Order} from "../models/Order";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor() { }
  url: string = "http://localhost:3000/orders";
  private readonly http = inject(HttpClient);
  getOrders(): Observable<Order[]> {
    console.log("Getting all orders");
    return this.http.get<Order[]>(this.url);
  }
}
