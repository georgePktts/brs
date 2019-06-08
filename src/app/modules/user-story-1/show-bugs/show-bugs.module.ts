import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowBugsComponent } from './show-bugs/show-bugs.component';
import { MatPaginatorModule } from '@angular/material/paginator';

// Angular Material
import { MatSortModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [ShowBugsComponent],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [ShowBugsComponent]
})
export class ShowBugsModule { }
