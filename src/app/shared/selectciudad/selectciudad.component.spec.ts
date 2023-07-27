import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectciudadComponent } from './selectciudad.component';

describe('SelectciudadComponent', () => {
  let component: SelectciudadComponent;
  let fixture: ComponentFixture<SelectciudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectciudadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectciudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
