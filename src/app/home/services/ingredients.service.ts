import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredients } from '../models/ingredients';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private IngredientsSubject: Subject<boolean> = new Subject<boolean>();

  constructor(private readonly http: HttpClient) { }

  public getAll(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>('/api/product/ingredient');
  }
  public getById(id: string): Observable<Ingredients> {
    return this.http.get<Ingredients>(`/api/product/ingredient/${id}`);
  }

  public save(ingredient: Ingredients): Observable<any> {
    if (ingredient.id) {
      return this.http.put<any>('/api/admin/product/ingredient', ingredient);
    } else {
      return this.http.post<any>('/api/admin/product/ingredient', ingredient);
    }
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/admin/product/ingredient/${id}`)
      .pipe(
        map(() => this.IngredientsSubject.next(true))
      )
  }
  public listUpdated(): Observable<boolean> {
    return this.IngredientsSubject.asObservable();
  }
}
