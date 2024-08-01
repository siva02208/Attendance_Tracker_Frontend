import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveSubmissionsComponent } from './leave-submissions.component';

describe('LeaveSubmissionsComponent', () => {
  let component: LeaveSubmissionsComponent;
  let fixture: ComponentFixture<LeaveSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveSubmissionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
