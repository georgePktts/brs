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
  isAsc = false;
  columnName: string;

  constructor(private bugService: ShowBugsService) {}

  ngOnInit() {
    this.bugService.getBugs('', this.isAsc).subscribe((data) => {
      this.bugs = data;
    });
  }

  getBugsSorted(event) {

    if (this.columnName !== event.toElement.innerHTML) {
      this.columnName = event.toElement.innerHTML;
      this.isAsc = false;
    }

    this.bugService.getBugs(event.toElement.innerHTML, this.isAsc).subscribe((data) => {
      this.bugs = data;
      this.isAsc = (this.isAsc) ? false : true;
    });
  }

}
