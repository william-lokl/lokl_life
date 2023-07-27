import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectpaisComponent } from './selectpais.component';

describe('SelectpaisComponent', () => {
  let component: SelectpaisComponent;
  let fixture: ComponentFixture<SelectpaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectpaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectpaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
