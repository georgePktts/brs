import { Component, OnInit, OnDestroy } from '@angular/core';
import { BugInfo } from '../../../models/bug-info.model';
import { ShowBugsService } from '../show-bugs.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private bugService: ShowBugsService, private toastr: ToastrService, private router: Router) { }

ngOnInit() {
    this.getBugs();
  }

  /**
   *Sorting our table by choosen column.
   *
   * @param {*} event The selected column name.
   * @memberof ShowBugsComponent
   */
  getBugsSorted(event) {

    if (this.columnName !== event) {
      this.columnName = event;
      this.isAsc = false;
    }

    this.pageIndex = 0;
    this.isAsc = (this.isAsc) ? false : true;

    this.getBugs(event, this.isAsc, 0, this.searchBug);
  }

  /**
   *Navigate us to (form-bug) edit bug of our given id.
   *
   * @param {*} id The id of the bug we wanted to edit.
   * @memberof ShowBugsComponent
   */
  goToEdit(id) {
    this.router.navigate(['bug', id]);
  }

  goToCreateForm() {
    this.router.navigate(['bug']);
  }

  /**
   *Navigate us to the next or the previous table page.
   *
   * @param {string} str Check which button we press next or previous.
   * @memberof ShowBugsComponent
   */
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

  /**
   *Filter our bugs with the given values.
   *
   * @param {NgForm} form
   * @memberof ShowBugsComponent
   */
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

  /**
   *Reset our searching form values and give us again all the bugs.
   *
   * @param {NgForm} form
   * @memberof ShowBugsComponent
   */
  resetSearchingForm(form: NgForm) {
    form.resetForm();
    form.controls['searchPriority'].setValue('');
    form.controls['searchReporter'].setValue('');
    form.controls['searchStatus'].setValue('');
    this.pageIndex = 0;
    this.getBugs(this.columnName, this.isAsc, this.pageIndex);
  }
/**
 *Call getBugs function from show-bugs.service.ts to fill the table with bugs.
 *
 * @param {string} [columnname] (Optional)Is the column name so as to known which column we need to sort.
 * @param {boolean} [isAsc]  (Optional)Help us with sorting direction.
 * @param {number} [pageIndex=0] Give us the number or our page.
 * @param {*} [searchBug] (Optional)Adding given values to filter bugs.
 * @memberof ShowBugsComponent
 */
getBugs(columnname?: string, isAsc?: boolean, pageIndex = 0, searchBug?) {
    this.subscription = this.bugService.getBugs(columnname, isAsc, pageIndex, searchBug).subscribe(data => {
      this.bugs = data;
    });
  }

  /**
   *Create an alert than ask if we really want to delete our bug or not.If we anwsear ok the bug is deleted.
   *
   * @param {string} id Give us the id of the bug we ask to delete.
   * @memberof ShowBugsComponent
   */
  goToDelete(id: string) {
    if (confirm('Are you sure you want to delete this bug?')) {
      this.subscriptionDelete = this.bugService.deleteBugs(id).subscribe(data =>
        this.getBugs(this.columnName, this.isAsc, this.pageIndex, this.searchBug)
      );
      this.toastr.success('Bug deleted successfully!');
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) { this.subscription.unsubscribe(); }
    if (this.subscriptionDelete) { this.subscriptionDelete.unsubscribe(); }
  }

}
