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

  getBugs(sortBy?: string, orderBy?: boolean, pageIndex = 0): Observable<BugInfo[]> {

    const direction: string = (orderBy) ? 'asc' : 'desc';


    switch (sortBy) {
      case 'Title': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=title,' + direction);
      case 'Priority': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=priority,' + direction);
      case 'Reporter': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=reporter,' + direction);
      case 'Date Created': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=createdAt,' + direction);
      case 'Status': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=status,' + direction);
      default: return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex);
    }
  }

  createBugs(newBug: BugInfo) {
    return this.http.post(this.endpointUrl + '/' , newBug);
  }

  getBugById(id): Observable<BugInfo> {
    return this.http.get<BugInfo>(this.endpointUrl + '/' + id);
  }

  updateBug(id: number, newBug: BugInfo): Observable<any> {
    return this.http.put(this.endpointUrl + '/' + id, newBug);
  }

}
