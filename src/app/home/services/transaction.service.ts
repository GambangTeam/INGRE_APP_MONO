import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClient) { }


  public getAllTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('/api/admin/transaction');
  }
  public getById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`/api/product/recipe/${id}`);
  }
  public transactionPayment(id: String): Observable<void> {
    return this.http.put<any>(`/api/admin/transaction/payment/success/${id}`, null);
  }
  public transactionDelivery(id: String): Observable<void> {
    return this.http.put<any>(`/api/admin/transaction/delivery/success/${id}`, null);
  }
  public listUpdated(): Observable<boolean> {
    return this.transactionSubject.asObservable();
  }
}
