import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Order} from "../models/Order";
import {Product} from "../models/Product";

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
  getOrderByEmail(email: string) {
    console.log("Getting order by email: " + email);
    return this.http.get<Order[]>(this.url + "?email=" + email);
  }
  getProducts(): Observable<Product[]> {
    this.url = "http://localhost:3000/products";
    return this.http.get<Product[]>(this.url);
  }
  postOrder(order: Order) : Observable<Order> {
    this.url = "http://localhost:3000/products";
    return this.http.post<Order>( this.url,order);
  }
}
