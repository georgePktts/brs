import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowBugsComponent } from './show-bugs/show-bugs.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

// Angular Material
import { MatSortModule, MatTableModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { ShortenTextPipe } from './shorten-text.pipe';
import { ChangePriorityPipe } from './change-priority.pipe';


@NgModule({
  declarations: [ShowBugsComponent, ShortenTextPipe, ChangePriorityPipe],
  imports: [
    CommonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [ShowBugsComponent]
})
export class ShowBugsModule { }
