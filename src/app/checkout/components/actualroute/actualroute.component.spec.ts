import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualrouteComponent } from './actualroute.component';

describe('ActualrouteComponent', () => {
  let component: ActualrouteComponent;
  let fixture: ComponentFixture<ActualrouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualrouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
