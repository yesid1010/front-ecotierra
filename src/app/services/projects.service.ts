import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { ProjectI } from '../interfaces/project';
@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private api_url = 'http://api-ecotierra.test/api/projects';
  constructor(private http: HttpClient) { }

  getProjects(){
    return this.http.get<ProjectI[]>(`${this.api_url}`)
  }

}
