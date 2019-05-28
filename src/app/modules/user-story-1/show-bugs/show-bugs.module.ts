import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowBugsComponent } from './show-bugs/show-bugs.component';

// Angular Material
import { MatSortModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [ShowBugsComponent],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [ShowBugsComponent]
})
export class ShowBugsModule { }
