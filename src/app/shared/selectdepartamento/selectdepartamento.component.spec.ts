import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectdepartamentoComponent } from './selectdepartamento.component';

describe('SelectdepartamentoComponent', () => {
  let component: SelectdepartamentoComponent;
  let fixture: ComponentFixture<SelectdepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectdepartamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectdepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
