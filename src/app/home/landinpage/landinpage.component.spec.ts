import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandinpageComponent } from './landinpage.component';

describe('LandinpageComponent', () => {
  let component: LandinpageComponent;
  let fixture: ComponentFixture<LandinpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandinpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandinpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
