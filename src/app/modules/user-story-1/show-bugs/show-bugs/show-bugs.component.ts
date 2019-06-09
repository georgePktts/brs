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

  displayedColumns: string[] = ['title', 'priority', 'reporter', 'createdAt' , 'status', 'edit'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bugService: ShowBugsService, private router: Router) { }

  ngOnInit() {
    this.bugService.getBugs().subscribe((data) => {
      this.bugs = data;
      this.dataSource = new MatTableDataSource<BugInfo>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  getBugsSorted(event) {

    if (this.columnName !== event) {
      this.columnName = event;
      this.isAsc = false;
    }

    this.bugService.getBugs(event, this.isAsc).subscribe((data) => {
      this.bugs = data;
      this.dataSource = new MatTableDataSource<BugInfo>(data);
      this.isAsc = (this.isAsc) ? false : true;
    });
  }

  goToEdit(id) {
    this.router.navigate(['bug', id]);
  }

}
