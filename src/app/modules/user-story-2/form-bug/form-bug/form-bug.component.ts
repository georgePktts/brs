import { Component, OnInit } from '@angular/core';
import { BugInfo } from 'src/app/modules/models/bug-info.model';
import { ShowBugsService } from 'src/app/modules/user-story-1/show-bugs/show-bugs.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-bug',
  templateUrl: './form-bug.component.html',
  styleUrls: ['./form-bug.component.css']
})
export class FormBugComponent implements OnInit {

  hfdhfd="1";
  myId: number;
  bugs: BugInfo[];

  constructor(private bugService: ShowBugsService,private route: ActivatedRoute) {

    this.myId = this.route.snapshot.params['id'];

  }

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

    this.bugService.createBugs(newBug);
  }


}
