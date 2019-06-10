import { Component, OnInit, ViewChild } from '@angular/core';
import { BugInfo } from '../../../models/bug-info.model';
import { ShowBugsService } from '../show-bugs.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';

@Component({
  selector: 'app-show-bugs',
  templateUrl: './show-bugs.component.html',
  styleUrls: ['./show-bugs.component.css']
})

export class ShowBugsComponent implements OnInit {

  bugs: BugInfo[];
  isAsc = false;
  columnName: string;
  pageIndex = 0;

  constructor(private bugService: ShowBugsService, private router: Router) { }

  ngOnInit() {
    this.bugService.getBugs().subscribe((data) => {
      this.bugs = data;
    });
  }

  getBugsSorted(event) {

    if (this.columnName !== event) {
      this.columnName = event;
      this.isAsc = false;
    }

    this.pageIndex = 0;
    this.isAsc = (this.isAsc) ? false : true;

    this.bugService.getBugs(event, this.isAsc).subscribe((data) => {
      this.bugs = data;
    });
  }

  goToEdit(id) {
    this.router.navigate(['bug', id]);
  }

  getPage(str: string) {
    if (str === 'previous') {
      this.pageIndex--;
      if (this.pageIndex < 0) {
        this.pageIndex = 0;
      }
    } else  {
      this.pageIndex++;
      if (this.bugs.length < 10) {
        this.pageIndex--;
      }
    }

    this.bugService.getBugs(this.columnName, this.isAsc, this.pageIndex).subscribe(data => {
      this.bugs = data;
    });
  }

}
