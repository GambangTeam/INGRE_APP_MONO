import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { Ingredients } from '../models/ingredients';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "multipart/form-data" // 👈
    })
  };
  private recipeSubject: Subject<boolean> = new Subject<boolean>();
  constructor(private readonly http: HttpClient) { }

  public getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('/api/product/categories');
  }
  public getAllIngredients(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>('/api/product/ingredient');
  }
  public getAllRecipe(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('/api/product/recipe');
  }
  public getById(id: string): Observable<Recipe> {
    return this.http.get<Recipe>(`/api/product/recipe/${id}`);
  }
  public save(recipe: Recipe, image?: File): Observable<any> {
    const formData: FormData = new FormData();

    let recipeDto = JSON.stringify(recipe)
    formData.append('recipeDto', recipeDto);

    console.log(recipeDto);
    if (image) {
      formData.append('upload', image, image.name)
    }
    console.log(formData.get('recipeDto'), formData.get('upload'));
    if (recipe.id) {
      formData.append('id', `${recipe.id}`);
      return this.http.put<any>('/api/admin/product/recipe', formData);
    } else {
      return this.http.post<any>('/api/admin/product/recipe', formData);
    }
  }
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`/ api / admin / product / recipe / ${id}`)
      .pipe(
        map(() => this.recipeSubject.next(true))
      )
  }
  public listUpdated(): Observable<boolean> {
    return this.recipeSubject.asObservable();
  }
}
