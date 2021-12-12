import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  transaction: Transaction[] = [];
  isLoading: boolean = false;
  searchText: string = '';
  buttonSuccess: Boolean = false;

  constructor(
    private readonly transactionService: TransactionService,
    private readonly router: Router
  ) { }
  ngOnInit(): void {
    this.init();
    this.transactionService.listUpdated();
  }
  init(): void {
    this.isLoading = true;
    this.transactionService.getAllTransaction().subscribe({
      next: (tx) => {
        this.transaction = tx;
      },
      error: () => {
        console.error;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  payment(id: string): void {
    this.isLoading = true;

    this.transactionService.transactionPayment(id).subscribe({
      next: (tx) => {
        console.log(tx);
        this.init();

      },
      error: () => {
        console.error;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  delivery(id: string): void {
    this.isLoading = true;

    this.transactionService.transactionDelivery(id).subscribe({
      next: (tx) => {
        console.log(tx);
        this.init();

      },
      error: () => {
        console.error;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  onDeleteUser(id: string): void {
    this.isLoading = true;

    this.transactionService.delete(id).subscribe({
      next: () => {
        this.init();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
