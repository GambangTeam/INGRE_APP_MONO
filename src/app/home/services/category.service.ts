import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
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
      return this.http.put<any>('/api/product/category', categories);
    } else {
      return this.http.post<any>('/api/product/category', categories);
    }
  }

  public listUpdated(): Observable<boolean> {
    return this.CategorySubject.asObservable();
  }



  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/product/category/${id}`)
      .pipe(
        map(() => this.CategorySubject.next(true))
      )
  }

}
