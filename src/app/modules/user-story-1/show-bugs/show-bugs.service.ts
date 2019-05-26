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

  getBugs(): Observable<BugInfo[]> {
    return this.http.get<BugInfo[]>(this.endpointUrl);
  }
}
