import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBugComponent } from './form-bug/form-bug.component';
import { FormsModule } from '@angular/forms';
// Angular Material
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [FormBugComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [FormBugComponent]
})
export class FormBugModule { }
