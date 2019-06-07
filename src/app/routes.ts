import { Routes } from '@angular/router';
import { ShowBugsComponent } from './modules/user-story-1/show-bugs/show-bugs/show-bugs.component';
import { FormBugComponent } from './modules/user-story-2/form-bug/form-bug/form-bug.component';
import { HomeComponent } from './home/home.component';



export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'display', component: ShowBugsComponent },
  { path: 'bug', component: FormBugComponent },
  { path: 'bug/:id', component: FormBugComponent }
   ];
