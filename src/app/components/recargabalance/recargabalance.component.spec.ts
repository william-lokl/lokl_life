import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecargabalanceComponent } from './recargabalance.component';

describe('RecargabalanceComponent', () => {
  let component: RecargabalanceComponent;
  let fixture: ComponentFixture<RecargabalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecargabalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecargabalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
