import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Ingredients } from '../models/ingredients';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

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
  public save(recipe: Recipe): Observable<any> {
    if (recipe.id) {
      return this.http.put<any>('/api/admin/product/recipe', recipe);
    } else {
      return this.http.post<any>('/api/admin/product/recipe', recipe);
    }
  }
}
