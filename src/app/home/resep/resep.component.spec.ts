import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResepComponent } from './resep.component';

describe('ResepComponent', () => {
  let component: ResepComponent;
  let fixture: ComponentFixture<ResepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
