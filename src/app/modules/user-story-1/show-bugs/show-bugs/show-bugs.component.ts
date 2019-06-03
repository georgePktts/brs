import { Component, OnInit } from '@angular/core';
import { BugInfo } from '../../../models/bug-info.model';
import { ShowBugsService } from '../show-bugs.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-bugs',
  templateUrl: './show-bugs.component.html',
  styleUrls: ['./show-bugs.component.css']
})

export class ShowBugsComponent implements OnInit {

  bugs: BugInfo[];
  isAsc = false;
  columnName: string;

  constructor(private bugService: ShowBugsService,private router: Router) { }

  ngOnInit() {
    this.bugService.getBugs().subscribe((data) => {
      this.bugs = data;
      console.log(data);
    });
  }

  getBugsSorted(event) {

    if (this.columnName !== event) {
      this.columnName = event;
      this.isAsc = false;
    }

    this.bugService.getBugs(event, this.isAsc).subscribe((data) => {
      this.bugs = data;
      this.isAsc = (this.isAsc) ? false : true;
    });
  }

  GoToEdit(id){

    this.router.navigate(['editbug',id]);
    this.bugService.getBugById(id);

  }

}
