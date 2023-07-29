import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCelularComponent } from './input-celular.component';

describe('InputCelularComponent', () => {
  let component: InputCelularComponent;
  let fixture: ComponentFixture<InputCelularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCelularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputCelularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
