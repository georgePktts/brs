import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugInfo } from '../../models/bug-info.model';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowBugsService {

  private readonly endpointUrl = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }

  getBugs(sortBy?: string, orderBy?: boolean, pageIndex = 0, searchBy?): Observable<BugInfo[]> {

    const direction: string = (orderBy) ? 'asc' : 'desc';

    let searchUrl = '';

    if (searchBy) {
      if (searchBy.title) {
        searchUrl += '&title=' + searchBy.title;
      }
      if (searchBy.priority) {
        searchUrl += '&priority=' + searchBy.priority;
      }
      if (searchBy.reporter) {
        searchUrl += '&reporter=' + searchBy.reporter;
      }
      if (searchBy.status) {
        searchUrl += '&status=' + searchBy.status;
      }
    }

    switch (sortBy) {
      case 'Title': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=title,' + direction + searchUrl);
      case 'Priority': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=priority,' + direction + searchUrl);
      case 'Reporter': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=reporter,' + direction + searchUrl);
      case 'Date Created': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=createdAt,' + direction + searchUrl);
      case 'Status': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=status,' + direction + searchUrl);
      default: return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + searchUrl);
    }
  }

  createBugs(newBug: BugInfo) {
    return this.http.post(this.endpointUrl + '/' , newBug);
  }

  getBugById(id: string): Observable<BugInfo> {
    return this.http.get<BugInfo>(this.endpointUrl + '/' + id);
  }

  updateBug(id: number, newBug: BugInfo): Observable<any> {
    return this.http.put(this.endpointUrl + '/' + id, newBug);
  }

  deleteBugs(id: string) {
    return this.http.delete(this.endpointUrl + '/' + id);
  }

}
