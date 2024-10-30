import {Component, inject, OnInit} from '@angular/core';
import {Order} from "../../models/Order";
import {NgPipesModule} from "ngx-pipes";
import {OrdersService} from "../../services/orders.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgPipesModule,
    RouterOutlet,
    RouterLink,
    DatePipe,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  orders: Order[] = [];
  private readonly service = inject(OrdersService);
  searchTerm: string = "";

  ngOnInit() {
    console.log("Cargando ordenes");
    this.cargarOrdenes();
  }
  cargarOrdenes() {
    console.log("Cargando ordenes");
    this.service.getOrders().subscribe(
      (data) => {
      console.log(data);
      this.orders = data;
    })
  }


}