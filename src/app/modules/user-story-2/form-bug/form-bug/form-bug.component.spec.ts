import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBugComponent } from './form-bug.component';
import { FormsModule, NgForm } from '@angular/forms';
import { ShowBugsService } from 'src/app/modules/user-story-1/show-bugs/show-bugs.service';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormBugModule } from '../form-bug.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormBugComponent', () => {
  let component: FormBugComponent;
  let fixture: ComponentFixture<FormBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ FormsModule, RouterTestingModule.withRoutes(
          [ {path: '', component: FormBugComponent} ]
        ),
        HttpClientModule,
        FormBugModule,
        BrowserAnimationsModule
      ],
      providers: [ShowBugsService]
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

  it('When form is empty then form should be invalid', () => {
    // const form = fixture.debugElement.children[5].injector.get(NgForm);
    const form = component.ngForm.form;
    form.reset();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(form.invalid).toBeTruthy();
    });

  });

  it('When form is full then form should be valid', () => {
    // const form = fixture.debugElement.children[5].injector.get(NgForm);
    const form = component.ngForm.form;

    fixture.whenStable().then(() => {
      form.controls['bugTitle'].setValue('Bug team 5');
      form.controls['bugDescription'].setValue('Ena description');
      form.controls['bugReporter'].setValue('QA');
      form.controls['bugStatus'].setValue('Done');
      form.controls['bugPriority'].setValue('1');
      expect(form.valid).toBeTruthy();
    });

  });

  it('When form has an invalid values is invalid', () => {

    const form = component.ngForm.form;

    fixture.whenStable().then(() => {
      form.controls['bugTitle'].setValue('Bu');
      form.controls['bugDescription'].setValue('Ena description');
      form.controls['bugReporter'].setValue('QA');
      form.controls['bugStatus'].setValue('Done');
      form.controls['bugPriority'].setValue('1');
      expect(form.valid).toBeFalsy();
    });

  });

  it('When form has empty  values is invalid', () => {

    const form = component.ngForm.form;

    fixture.whenStable().then(() => {
      form.controls['bugTitle'].setValue('');
      form.controls['bugDescription'].setValue('');
      form.controls['bugReporter'].setValue('');
      form.controls['bugStatus'].setValue('');
      form.controls['bugPriority'].setValue('');
      expect(form.valid).toBeFalsy();
    });
  });
});
