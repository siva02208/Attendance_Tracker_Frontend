import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRegComponent } from './staff-reg.component';

describe('StaffRegComponent', () => {
  let component: StaffRegComponent;
  let fixture: ComponentFixture<StaffRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRegComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
