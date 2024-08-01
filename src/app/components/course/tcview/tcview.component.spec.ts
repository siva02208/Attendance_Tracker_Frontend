import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcviewComponent } from './tcview.component';

describe('TcviewComponent', () => {
  let component: TcviewComponent;
  let fixture: ComponentFixture<TcviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TcviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
