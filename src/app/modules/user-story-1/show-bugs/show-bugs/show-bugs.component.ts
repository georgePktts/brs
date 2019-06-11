import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BugInfo } from '../../../models/bug-info.model';
import { ShowBugsService } from '../show-bugs.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { toUnicode } from 'punycode';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-bugs',
  templateUrl: './show-bugs.component.html',
  styleUrls: ['./show-bugs.component.css']
})

export class ShowBugsComponent implements OnInit, OnDestroy {

  bugs: BugInfo[];
  isAsc = false;
  columnName: string;
  pageIndex = 0;
  subscription: Subscription;
  searchBug = {
    title: '',
    priority: 0,
    reporter: '',
    status: ''
  };

  constructor(private bugService: ShowBugsService, private router: Router) { }

  ngOnInit() {
    this.getBugs();
  }

  getBugsSorted(event) {

    if (this.columnName !== event) {
      this.columnName = event;
      this.isAsc = false;
    }

    this.pageIndex = 0;
    this.isAsc = (this.isAsc) ? false : true;

    this.getBugs(event, this.isAsc, 0, this.searchBug);
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

    this.getBugs(this.columnName, this.isAsc, this.pageIndex, this.searchBug);
  }

  searchBugs(form: NgForm) {
    this.searchBug = {
      title: form.value.searchTitle,
      priority: form.value.searchPriority,
      reporter: form.value.searchReporter,
      status: form.value.searchStatus
    };

    this.getBugs(this.columnName, this.isAsc, this.pageIndex, this.searchBug);
  }

  resetSearchingForm(form: NgForm) {
    form.resetForm();
  }

  getBugs(columnname?: string, isAsc?: boolean, pageIndex = 0, searchBug?) {
    this.subscription = this.bugService.getBugs(columnname, isAsc, pageIndex, searchBug).subscribe(data => {
      this.bugs = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
