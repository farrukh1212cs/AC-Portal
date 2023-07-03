import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DTOProject, DTOProjectInsert } from '../interfaces';
import { AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = 'http://20.12.65.123:2005/Api/Projects';

  constructor(private http: HttpClient) {}

  getProjectById(id: number): Observable<any> {
    const url = `${this.baseUrl}/GetProjectById?Id=${id}`;
    return this.http.get(url);
  }

  getAllProjects(): Observable<any> {
    const url = `${this.baseUrl}/GetAllProjects`;
    return this.http.get(url);
  }

  createProject(project: DTOProjectInsert): Observable<any> {
    const url = `${this.baseUrl}/CreateProjects`;
    return this.http.post(url, project);
  }

  updateProject(project: DTOProject): Observable<any> {
    const url = `${this.baseUrl}/UpdateProjects`;
    return this.http.post(url, project);
  }

  deleteProject(project: DTOProject): Observable<any> {
    const url = `${this.baseUrl}/DeleteProjects`;
    const options = {
      body: project // Pass the project as the request body
    };
    return this.http.delete(url, options);
  }
  
}
