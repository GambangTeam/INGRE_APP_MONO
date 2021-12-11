import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from '../models/category';

import { CategoryService } from './category.service';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [CategoryService]
    }).compileComponents();
  })

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    categoryService = TestBed.inject(CategoryService);
  });

  it('should be created', () => {
    expect(categoryService).toBeTruthy();
  });

  it('Should return Obsevable<any> in Post Method', () => {
    const url = '/api/product/category';
    const mockCategory: Category = {
      category: 'Makan Malam',
    }
    categoryService.save(mockCategory).subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(mockCategory);
  })

  it('Should return Observable<Category[]> GET method', () => {
    const url = '/api/product/categories';
    categoryService.getAllCategory().subscribe(
      (response: any) => {
        expect(response).toBeDefined();
      }
    )
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
  });

  it('Should return Observable<void> DELETE method', () => {
    const mockCategory: Category = {
      id: '1',
      category: 'Makan Malam'
    }
    categoryService.delete(mockCategory.id!).subscribe(
      (response: any) => {
        expect(response).toBeFalsy();
      }
    )

    const url = `/api/product/categories/${mockCategory.id}`;
    categoryService.delete(mockCategory.id!);
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('DELETE');
  });

})
