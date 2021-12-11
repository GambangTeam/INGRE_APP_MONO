import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private CategorySubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClient) { }

  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/product/categories');
  }

  public save(categories: Category): Observable<any> {
    if (categories.id) {
      return this.http.put<any>('/api/product/categories', categories);
    } else {
      return this.http.post<any>('/api/product/categories', categories);
    }
  }

  public listUpdated(): Observable<boolean> {
    return this.CategorySubject.asObservable();
  }

}
