import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardhotelesComponent } from './cardhoteles.component';

describe('CardhotelesComponent', () => {
  let component: CardhotelesComponent;
  let fixture: ComponentFixture<CardhotelesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardhotelesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardhotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
