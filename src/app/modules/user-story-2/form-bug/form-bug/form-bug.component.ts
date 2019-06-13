import { Component, OnInit, OnDestroy } from '@angular/core';
import { BugInfo } from 'src/app/modules/models/bug-info.model';
import { ShowBugsService } from 'src/app/modules/user-story-1/show-bugs/show-bugs.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Comment } from '../../../models/comment.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { checkServerIdentity } from 'tls';

@Component({
  selector: 'app-form-bug',
  templateUrl: './form-bug.component.html',
  styleUrls: ['./form-bug.component.css']
})
export class FormBugComponent implements OnInit, OnDestroy {

  isCreate = true;
  isGetComplete = false;
  id: number;
  bugs: BugInfo;
  subscriptionGetById: Subscription;
  subscriptionCreate: Subscription;
  subscriptionUpdateBug: Subscription;
  subscriptionUpdateComment: Subscription;


  constructor(private bugService: ShowBugsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isCreate = (this.id) ? false : true;

    if (!this.isCreate) {
      this.subscriptionGetById = this.bugService.getBugById(this.id).subscribe(data => {this.bugs = data; this.isGetComplete = true; });
    } else {
      this.isGetComplete = true;
    }
  }

  submitForm(formValue) {
    const dateTimeCreated = new Date();

    const newBug: BugInfo = {
      title: formValue.bugTitle,
      description: formValue.bugDescription,
      priority: formValue.bugPriority,
      reporter: formValue.bugReporter,
      createdAt: dateTimeCreated.toString(),
      status: formValue.bugStatus,
      comments: (this.bugs) ? this.bugs.comments : null
    };

    if (this.id) {
      this.subscriptionUpdateBug = this.bugService.updateBug(this.id, newBug).subscribe((data) => {
        this.router.navigate(['display']);
      });
    } else {
      this.subscriptionCreate = this.bugService.createBugs(newBug).subscribe((data) => {
        this.router.navigate(['display']);
      });
    }
  }

  submitComment(form: NgForm) {
    const newComment: Comment = {
      reporter: form.value.commentReporter,
      description: form.value.commentDescription
    };

    if (this.bugs.comments) {
      this.bugs.comments.push(newComment);
    } else {
      this.bugs.comments = [newComment];
    }

    this.subscriptionUpdateComment = this.bugService.updateBug(this.id, this.bugs).subscribe((data) => { });
    form.resetForm();
  }

  ngOnDestroy(): void {
    if (this.subscriptionGetById) { this.subscriptionGetById.unsubscribe(); }
    if (this.subscriptionCreate) { this.subscriptionCreate.unsubscribe(); }
    if (this.subscriptionUpdateBug) { this.subscriptionUpdateBug.unsubscribe(); }
    if (this.subscriptionUpdateComment) { this.subscriptionUpdateComment.unsubscribe(); }
  }

}
