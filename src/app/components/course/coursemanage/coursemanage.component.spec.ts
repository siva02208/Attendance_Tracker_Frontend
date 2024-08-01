import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursemanageComponent } from './coursemanage.component';

describe('CoursemanageComponent', () => {
  let component: CoursemanageComponent;
  let fixture: ComponentFixture<CoursemanageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursemanageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursemanageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
