import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Recipe } from '../models/recipe';
import { CategoryService } from './category.service';
import { IngredientsService } from './ingredients.service';

import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let ingredientsService: IngredientsService;
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [RecipeService, IngredientsService, CategoryService]
    }).compileComponents();
  })

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    recipeService = TestBed.inject(RecipeService);
    ingredientsService = TestBed.inject(IngredientsService);
    categoryService = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(ingredientsService).toBeTruthy();
    expect(categoryService).toBeTruthy();
    expect(recipeService).toBeTruthy();
  });

  it('Should return Observable<Recipe[]> GET method', () => {
    const url = '/api/product/recipe';
    recipeService.getAllRecipe().subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  });

  it('Should return Observable<Category[]> GET method', () => {
    const url = '/api/product/categories';
    recipeService.getAllCategory().subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  });

  it('Should return Observable<Ingredients[]> GET method', () => {
    const url = '/api/product/ingredient';
    recipeService.getAllIngredients().subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  });
});
