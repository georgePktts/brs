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
  switchBugsTitle: string;
  isAsc: boolean = false;

  constructor(private bugService: ShowBugsService) {}

  ngOnInit() {
    this.bugService.getBugs('', this.isAsc).subscribe((data) => {
      this.bugs = data;
    });
  }
  getBugsSorted(event) {
    console.log(event.toElement.innerHTML)
    this.switchBugsTitle=event.toElement.innerHTML;
    this.bugService.getBugs(this.switchBugsTitle, this.isAsc).subscribe((data) => {
      this.bugs = data;
      this.isAsc = (this.isAsc) ? false : true
    });
  }
}
