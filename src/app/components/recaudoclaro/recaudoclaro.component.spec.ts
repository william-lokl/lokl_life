import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaudoclaroComponent } from './recaudoclaro.component';

describe('RecaudoclaroComponent', () => {
  let component: RecaudoclaroComponent;
  let fixture: ComponentFixture<RecaudoclaroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaudoclaroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecaudoclaroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
