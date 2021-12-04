import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResepComponent } from './form-resep.component';

describe('FormResepComponent', () => {
  let component: FormResepComponent;
  let fixture: ComponentFixture<FormResepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormResepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
