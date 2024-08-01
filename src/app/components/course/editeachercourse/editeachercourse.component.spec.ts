import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeachercourseComponent } from './editeachercourse.component';

describe('EditeachercourseComponent', () => {
  let component: EditeachercourseComponent;
  let fixture: ComponentFixture<EditeachercourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditeachercourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeachercourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
