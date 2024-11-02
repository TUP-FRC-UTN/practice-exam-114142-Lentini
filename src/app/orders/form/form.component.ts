import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray, FormBuilder,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {OrdersService} from "../../services/orders.service";
import {CommonModule, NgClass} from "@angular/common";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  router: Router = inject(Router);
  service = inject(OrdersService);
  form: FormGroup;
  products: FormArray;
  productOptions: Product[] = []; // Define productOptions como un array
  ngOnInit() {
    this.loadProductOptions();
  }

  constructor(private fb: FormBuilder, private orderService: OrdersService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email], [this.emailUnico()]],
      products: this.fb.array([])
    });
    this.products = this.form.get('products') as FormArray;
  }

  emailUnico() : AsyncValidatorFn {
    console.log('Validando')
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      return this.service.getOrderByEmail(control.value).pipe(
        map(data => {
          console.log(data.pop());
          return data.length > 0 ? { emailUnico: true} : null
        }),
        catchError(() => {
          alert("error en la api")
          return of({apiCalida : true})
        })
      )
    }
  }
  irForm() {
    this.router.navigate(['orders']);
  }

  sendForm() {

  }
  loadProductOptions(): void {
    this.service.getProducts().subscribe((orders) => {
      console.log(orders)
      this.productOptions = orders;
    }, error => {
      console.error("Error al obtener los productos", error);
    });
  }
  getProductArray() {
    return this.form.get('products') as FormArray;
  }
  addProduct(): void {
    const productGroup = this.fb.group({
      nombre: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1), Validators.max(150)]],
      precio: [{ value: '', disabled: true }],
      stock: [{ value: '', disabled: true }]
    });
    productGroup.get('nombre')?.valueChanges.subscribe((selectedProductId) => {
      const selectedProduct = this.productOptions.find(product => product.id === selectedProductId);
      if (selectedProduct) {
        console.log(Number(selectedProduct.stock));
        productGroup.get('precio')?.setValue(selectedProduct.price);
        productGroup.get('stock')?.setValue(selectedProduct.stock);
        productGroup.get('cantidad')?.setValidators([Validators.required, Validators.min(1),Validators.max(Number(selectedProduct.stock))])
      }
    });
    this.products.push(productGroup);
  }

  removeProduct(index: number) {
    this.products.removeAt(index);
  }
}
