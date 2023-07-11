import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinuteroComponent } from './minutero.component';

describe('MinuteroComponent', () => {
  let component: MinuteroComponent;
  let fixture: ComponentFixture<MinuteroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinuteroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinuteroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
