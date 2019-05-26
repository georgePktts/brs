import { Component, OnInit } from '@angular/core';
import { BugInfo } from '../../../models/bug-info.model';
import { ShowBugsService } from '../show-bugs.service';

@Component({
  selector: 'app-show-bugs',
  templateUrl: './show-bugs.component.html',
  styleUrls: ['./show-bugs.component.css']
})

export class ShowBugsComponent implements OnInit {

  bugs: BugInfo[];

  constructor(private bugService: ShowBugsService) {}

  ngOnInit() {
    this.bugService.getBugs().subscribe((data) => {
      this.bugs = data;
    });
  }
}
