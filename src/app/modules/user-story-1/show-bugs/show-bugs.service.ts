import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BugInfo } from '../../models/bug-info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowBugsService {

  private readonly endpointUrl = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }

  getBugs(sortBy?, orderBy?): Observable<BugInfo[]> {

    const direction: string = (orderBy) ? 'asc' : 'desc';

    switch (sortBy) {
      case 'Title': return this.http.get<BugInfo[]>(this.endpointUrl + '?sort=title,' + direction);
      case 'Priority': return this.http.get<BugInfo[]>(this.endpointUrl + '?sort=priority,' + direction);
      case 'Reporter': return this.http.get<BugInfo[]>(this.endpointUrl + '?sort=reporter,' + direction);
      case 'Date Created': return this.http.get<BugInfo[]>(this.endpointUrl + '?sort=createdAt,' + direction);
      case 'Status': return this.http.get<BugInfo[]>(this.endpointUrl + '?sort=status,' + direction);
      default: return this.http.get<BugInfo[]>(this.endpointUrl);
    }
  }

  createBugs(newBug: BugInfo) {
    this.http.post(this.endpointUrl , newBug).subscribe(responseData => {
      console.log(responseData);
    });
  }

  getBugById(id): Observable<BugInfo> {
    return this.http.get<BugInfo>(this.endpointUrl + '/' + id);
  }

}
