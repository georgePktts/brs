import { Component, OnInit } from '@angular/core';
import { BugInfo } from 'src/app/modules/models/bug-info.model';
import { ShowBugsService } from 'src/app/modules/user-story-1/show-bugs/show-bugs.service';

@Component({
  selector: 'app-form-bug',
  templateUrl: './form-bug.component.html',
  styleUrls: ['./form-bug.component.css']
})
export class FormBugComponent implements OnInit {

  constructor(private bugService: ShowBugsService) { }

  ngOnInit() {
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
    console.log(newBug);
    this.bugService.createBugs(newBug);
  }

}
