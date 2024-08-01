import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { codeComponent } from './code.component';

describe('codeComponent', () => {
  let component: codeComponent;
  let fixture: ComponentFixture<codeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ codeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(codeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
