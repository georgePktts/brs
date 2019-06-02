import { Routes } from '@angular/router';
import { ShowBugsComponent } from './modules/user-story-1/show-bugs/show-bugs/show-bugs.component';
import { FormBugComponent } from './modules/user-story-2/form-bug/form-bug/form-bug.component';



export const routes: Routes = [
  { path: '', component: ShowBugsComponent },
  { path: 'post', component: FormBugComponent }
   ];
