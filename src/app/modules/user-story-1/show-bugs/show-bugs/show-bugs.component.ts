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
  subscriptionDelete: Subscription;
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
    if (this.searchBug.title !== form.value.searchTitle) { this.pageIndex = 0; }
    if (this.searchBug.priority !== form.value.searchPriority) { this.pageIndex = 0; }
    if (this.searchBug.reporter !== form.value.searchReporter) { this.pageIndex = 0; }
    if (this.searchBug.status !== form.value.searchStatus) { this.pageIndex = 0; }

    this.searchBug = {
      title: form.value.searchTitle,
      priority: form.value.searchPriority,
      reporter: form.value.searchReporter,
      status: form.value.searchStatus
    };

    console.log('Form: ' + form.value.searchPriority);
    console.log(this.searchBug);

    this.getBugs(this.columnName, this.isAsc, this.pageIndex, this.searchBug);
  }

  resetSearchingForm(form: NgForm) {
    form.resetForm();
    form.controls['searchPriority'].setValue('');
    form.controls['searchReporter'].setValue('');
    form.controls['searchStatus'].setValue('');
    this.pageIndex = 0;
    this.getBugs(this.columnName, this.isAsc, this.pageIndex);
  }

  getBugs(columnname?: string, isAsc?: boolean, pageIndex = 0, searchBug?) {
    this.subscription = this.bugService.getBugs(columnname, isAsc, pageIndex, searchBug).subscribe(data => {
      this.bugs = data;
    });
  }

  goToDelete(id: string) {
    if (confirm('Are you sure you want to delete this bug?')) {
      this.subscriptionDelete = this.bugService.deleteBugs(id).subscribe(data =>
        this.getBugs(this.columnName, this.isAsc, this.pageIndex, this.searchBug)
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
