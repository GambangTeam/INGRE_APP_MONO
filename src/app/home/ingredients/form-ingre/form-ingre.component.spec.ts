import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIngreComponent } from './form-ingre.component';

describe('FormIngreComponent', () => {
  let component: FormIngreComponent;
  let fixture: ComponentFixture<FormIngreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormIngreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIngreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
