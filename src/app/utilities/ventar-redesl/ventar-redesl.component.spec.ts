import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentarRedeslComponent } from './ventar-redesl.component';

describe('VentarRedeslComponent', () => {
  let component: VentarRedeslComponent;
  let fixture: ComponentFixture<VentarRedeslComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentarRedeslComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentarRedeslComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
