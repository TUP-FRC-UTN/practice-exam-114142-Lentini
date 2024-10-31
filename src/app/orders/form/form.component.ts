import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormControl,
  FormGroup, FormsModule,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {OrdersService} from "../../services/orders.service";
import {CommonModule, NgClass} from "@angular/common";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  router: Router = inject(Router);
  service = inject(OrdersService);
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email, this.emailUni()]),
    products: new FormArray([])
  })
  emailUni() : AsyncValidatorFn {
    console.log('Validando')
    return (control : AbstractControl) : Observable<ValidationErrors | null> => {
      return this.service.getOrderByEmail(control.value).pipe(
        map(data => {
          console.log(data);
          return data.length > 0 ? {email : true} : null
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
}
