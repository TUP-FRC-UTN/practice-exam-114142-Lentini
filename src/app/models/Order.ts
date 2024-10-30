import {Product} from "./Product";

export class Order {
  id: number = 0;
  customerName : string = "";
  email : string = "";
  products: Product[] = [];
  total: number = 0;
  orderCode: number = 0;
  timestamp: Date = new Date();
}
