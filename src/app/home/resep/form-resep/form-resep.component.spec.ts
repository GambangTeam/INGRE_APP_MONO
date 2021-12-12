import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidationErrors } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Recipe } from '../../models/recipe';
import { Category } from '../../models/category';
import { RecipeService } from '../../services/recipe.service';

import { FormResepComponent } from './form-resep.component';

describe('FormResepComponent', () => {
  let component: FormResepComponent;
  let fixture: ComponentFixture<FormResepComponent>;
  let recipeService: RecipeService;
  let httpMock: HttpTestingController;
  let error: ValidationErrors = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormResepComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [RecipeService]
    }).compileComponents();
  })

  beforeEach(() => {
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(FormResepComponent);
    recipeService = TestBed.inject(RecipeService);
    component = fixture.componentInstance;
    fixture.detectChanges
  })

  it('Component created', () => {
    expect(component).toBeTruthy();
  })

  it('DonationForm check validity', () => {
    const categoryMock: Category = {
      category: 'iya'
    }
    const recipeMock: Recipe =
    {
      id: '1',
      category: categoryMock,
      name: 'haha',
      recipeDetail: 'test',
      ingredients: []

    }
    component.setFormValue(recipeMock);
    expect(component.recipeForm.value).toEqual(recipeMock);
  })
});
