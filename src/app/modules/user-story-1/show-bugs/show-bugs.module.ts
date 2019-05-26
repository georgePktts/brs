import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowBugsComponent } from './show-bugs/show-bugs.component';

@NgModule({
  declarations: [ShowBugsComponent],
  imports: [
    CommonModule
  ],
  exports: [ShowBugsComponent]
})
export class ShowBugsModule { }
