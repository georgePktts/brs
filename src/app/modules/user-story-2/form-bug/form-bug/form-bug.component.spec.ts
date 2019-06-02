import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBugComponent } from './form-bug.component';

describe('FormBugComponent', () => {
  let component: FormBugComponent;
  let fixture: ComponentFixture<FormBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
