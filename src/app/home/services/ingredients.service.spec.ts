import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Ingredients } from '../models/ingredients';

import { IngredientsService } from './ingredients.service';

describe('IngredientsService', () => {
  let ingredientsService: IngredientsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [IngredientsService]
    }).compileComponents();
  })

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    ingredientsService = TestBed.inject(IngredientsService);
  });

  it('should be created', () => {
    expect(ingredientsService).toBeTruthy();
  });

  it('Should return Obsevable<any> in Post Method', () => {
    const url = '/api/admin/product/ingredient';
    const mockIngredient: Ingredients = {
      name: 'ahe',
      stock: '100',
      price: '1000',
      unit: 'satuan'
    }
    ingredientsService.save(mockIngredient).subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockIngredient);
  })

  it('Should return Observable<any> in PUT method', () => {
    const url = '/api/admin/product/ingredient';
    const mockIngredient: Ingredients = {
      id: '1',
      name: 'ahe',
      stock: '100',
      price: '1000',
      unit: 'satuan'
    }
    ingredientsService.save(mockIngredient).subscribe(
      (respon: any) => {
        expect(respon).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(mockIngredient)
  })
  it('Should return Observable<void> DELETE method', () => {
    const mockIngredient: Ingredients = {
      id: '1',
      name: 'ahe',
      stock: '100',
      price: '1000',
      unit: 'satuan'
    }
    ingredientsService.delete(mockIngredient.id!).subscribe(
      (response: any) => {
        expect(response).toBeFalsy();
      }
    )

    const url = `/api/admin/product/ingredient/${mockIngredient.id}`;
    ingredientsService.delete(mockIngredient.id!);
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('DELETE');
  });

  it('Should return Observable<Ingredients[]> GET method', () => {
    const url = '/api/product/ingredient';
    ingredientsService.getAll().subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  });
});
