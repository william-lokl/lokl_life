import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaremotaComponent } from './ventaremota.component';

describe('VentaremotaComponent', () => {
  let component: VentaremotaComponent;
  let fixture: ComponentFixture<VentaremotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentaremotaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaremotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
