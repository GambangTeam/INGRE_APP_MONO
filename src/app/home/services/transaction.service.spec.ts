import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Transaction } from '../models/transaction';

import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let transactionService: TransactionService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [TransactionService]
    }).compileComponents();
  })

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    transactionService = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(transactionService).toBeTruthy();
  });

  it('Should return Observable<Ingredients[]> GET method', () => {
    const url = '/api/admin/transaction';
    transactionService.getAllTransaction().subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  });

  it('Should change Status Done return Observable<void> PUT method', () => {
    const mockTransaction: Transaction = {
      id: '1',
      name: 'ahe',
      address: 'hha',
      phonNumber: '0909',
      recipeName: 'all',
      stat: 'a',
      total: 12000

    }
    transactionService.transactionDelivery(mockTransaction.id!).subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )

    const url = `/api/admin/transaction/delivery/success/${mockTransaction.id}`;
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(null);

  });

  it('Should change Status On Delivery return Observable<void> PUT method', () => {
    const mockTransaction: Transaction = {
      id: '1',
      name: 'ahe',
      address: 'hha',
      phonNumber: '0909',
      recipeName: 'all',
      stat: 'a',
      total: 12000

    }
    transactionService.transactionPayment(mockTransaction.id!).subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )

    const url = `/api/admin/transaction/payment/success/${mockTransaction.id}`;
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(null);

  });

  it('Should return Observable<void> DELETE method', () => {
    const mockTransaction: Transaction = {
      id: '1',
      name: 'ahe',
      address: 'hha',
      phonNumber: '0909',
      recipeName: 'all',
      stat: 'a',
      total: 12000

    }
    transactionService.delete(mockTransaction.id!).subscribe(
      (response: any) => {
        expect(response).toBeFalsy();
      }
    )

    const url = `/api/admin/transaction/${mockTransaction.id}`;
    transactionService.delete(mockTransaction.id!);
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('DELETE');
  });
});
