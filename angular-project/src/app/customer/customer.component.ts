import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { Customer } from '../model/customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  list$: Observable<Customer[]> = this.customerService.getAll();
  customer$: Observable<Customer> = this.ar.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Customer())
      }
      return this.customerService.get(Number(params.id))
    })
  )

  constructor(
    private customerService: CustomerService,
    private ar: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
  }

  onUpdate(customer: Customer): void {
    if (customer.id === 0) {
      console.log(customer.id);
      this.customerService.create(customer).subscribe(() => {
        this.router.navigate([''])
      }, (error) => {
        console.error(error);
      })
    } else {
      this.customerService.update(customer).subscribe(() => {
        this.router.navigate([''])
      })
    }
  }

}


