import { Routes } from '@angular/router';
import {FormComponent} from "./orders/form/form.component";
import {ListComponent} from "./orders/list/list.component";

export const routes: Routes = [

    //Rutas
  {path: 'orders' , component: ListComponent},
  {path: 'create-order', component: FormComponent},
  {path: '' , component: FormComponent}, //Por defecto
];
