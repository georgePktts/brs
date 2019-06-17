import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BugInfo } from '../../models/bug-info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowBugsService {

  private readonly endpointUrl = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }

  /**
   * This method is used to get a list of bugs.
   * The arguments are used in the filtering of bugs.
   *
   * @param sortBy is the column name used to order the results
   * @param orderBy is used to order the data in ascending or descending order
   * @param pageIndex is the page of bugs that we request from the server
   * @param searchBy Object that conatain the column names and values to filter the result
   */
  getBugs(sortBy?: string, orderBy?: boolean, pageIndex = 0, searchBy?): Observable<HttpResponse<BugInfo[]>> {

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
      case 'Title': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=title,' + direction + searchUrl,
        { observe: 'response' });
      case 'Priority': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=priority,' + direction + searchUrl,
        { observe: 'response' });
      case 'Reporter': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=reporter,' + direction + searchUrl,
        { observe: 'response' });
      case 'Date Created': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=createdAt,'
       + direction + searchUrl, { observe: 'response' });
      case 'Status': return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + '&sort=status,' + direction + searchUrl,
        { observe: 'response' });
      default: return this.http.get<BugInfo[]>(this.endpointUrl + '?page=' + pageIndex + searchUrl, { observe: 'response' });
    }
  }

  /**
   * This method takes as input an object and create a bug using the post request.
   *
   * @param newBug is the object that will be send to the server
   */
  createBugs(newBug: BugInfo) {
    return this.http.post(this.endpointUrl + '/' , newBug);
  }

  /**
   * This method takes as input the id of a bug and return the whole bug if exists.
   *
   * @param id is the id that will be searched in the server
   */
  getBugById(id): Observable<BugInfo> {
    return this.http.get<BugInfo>(this.endpointUrl + '/' + id);
  }

  /**
   * This method updates a bug in the server.
   *
   * @param id of the bug to be updated. It is used to find the bug in the database
   * @param newBug is the bug that will take the place of the bug found in the database
   */
  updateBug(id: number, newBug: BugInfo): Observable<any> {
    return this.http.put(this.endpointUrl + '/' + id, newBug);
  }

  /**
   * This method if used to delete a bug from the server.
   *
   * @param id is the id of the bug that we want to delete from the database
   */
  deleteBugs(id: string) {
    return this.http.delete(this.endpointUrl + '/' + id);
  }

  getConfigResponse(): Observable<HttpResponse<BugInfo[]>> {
    return this.http.get<BugInfo[]>(
      this.endpointUrl, { observe: 'response' });
  }
}
