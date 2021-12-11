import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  transaction: Transaction[] = [];
  isLoading: boolean = false;
  searchText: string = '';
  buttonSuccess: Boolean = false;

  constructor(private readonly transactionService: TransactionService,
    private readonly router: Router,
  ) { }
  ngOnInit(): void {
    this.init();
    this.transactionService.listUpdated();
  }
  init(): void {
    this.transactionService.getAllTransaction()
      .subscribe({
        next: (tx) => {
          this.transaction = tx
        },
        error: () => {
          console.error
        },
        complete: () => { }
      })
  }

  payment(id: string): void {
    this.transactionService.transactionPayment(id)
      .subscribe({
        next: (tx) => {
          console.log(tx);
          this.router.navigateByUrl('user');
        },
        error: () => {
          console.error;
        },
        complete: () => {

        }
      })
  }

  delivery(id: string): void {
    this.transactionService.transactionDelivery(id)
      .subscribe({
        next: (tx) => {
          console.log(tx);
          this.router.navigateByUrl('user');
        },
        error: () => {
          console.error;
        },
        complete: () => {

        }
      })
  }
  onDeleteUser(id: string): void {
    this.transactionService.delete(id)
      .subscribe({
        next: () => { },
        error: (error) => { console.error(error) },
        complete: () => { }
      })
  }

}
