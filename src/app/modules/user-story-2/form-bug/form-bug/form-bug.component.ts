import { Component, OnInit } from '@angular/core';
import { BugInfo } from 'src/app/modules/models/bug-info.model';
import { ShowBugsService } from 'src/app/modules/user-story-1/show-bugs/show-bugs.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-bug',
  templateUrl: './form-bug.component.html',
  styleUrls: ['./form-bug.component.css']
})
export class FormBugComponent implements OnInit {

  isCreate = true;
  isGetComplete = false;
  id: number;
  bugs: BugInfo;

  constructor(private bugService: ShowBugsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isCreate = (this.id) ? false : true;

    if (!this.isCreate) {
      this.bugService.getBugById(this.id).subscribe(data => {this.bugs = data; this.isGetComplete = true;});
    } else {
      this.isGetComplete = true;
      // this.bugs$ = of({title: '', priority: 0, reporter: '', status: '', description: '', createdAt: ''});
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
      status: formValue.bugStatus
    };

    if (this.id) {
      this.bugService.updateBug(newBug, this.id);
    } else {
      this.bugService.createBugs(newBug);
    }
    this.router.navigate(['']);

  }

  submitComment(formValue) {

    const newComment: Comment = {
      reporter: formValue.commentReporter,
      description: formValue.commentDescription
    };

    this.bugs.comments.push(newComment);

    this.bugService.updateBug(this.bugs, this.id);
    this.router.navigate(['bugs', this.id]);
  }

}
