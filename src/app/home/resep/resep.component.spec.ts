import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipeService } from '../services/recipe.service';

import { ResepComponent } from './resep.component';

describe('ResepComponent', () => {
  let component: ResepComponent;
  let recipeService: RecipeService;
  let fixture: ComponentFixture<ResepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResepComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [RecipeService],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResepComponent);
    recipeService = TestBed.inject(RecipeService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
