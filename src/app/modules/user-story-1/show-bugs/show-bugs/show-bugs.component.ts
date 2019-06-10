import { Component, OnInit, ViewChild } from '@angular/core';
import { BugInfo } from '../../../models/bug-info.model';
import { ShowBugsService } from '../show-bugs.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  // searchBug = {searchTitle: null,
  //             searchPriority: null,
  //             searchReporter: null,
  //             searchStatus: null};

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

  searchBugs(formValue) {
    const searchBug: BugInfo = {
      title: formValue.searchTitle,
      priority: formValue.searchPriority,
      reporter: formValue.searchReporter,
      status: formValue.searchStatus
    };


    this.bugService.getBugs(this.columnName, this.isAsc, this.pageIndex, searchBug).subscribe(data => {
      this.bugs = data;
    });




  }

}
