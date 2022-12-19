import { Component, OnInit } from '@angular/core';
import { ProjectI } from '../interfaces/project';
import { ProjectsService } from '../services/projects.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  constructor(private projectService:ProjectsService) {}
  projects:ProjectI[]=[]
  description:string=''

  loadProjects() {
    this.projectService.getProjects().subscribe((response) => {
      this.projects = response;
      console.log(response)
    });
  }

  ngOnInit(): void {
   this.loadProjects()
  }

  setDescription(desc:string){
    this.description = desc
  }

  emptyDescription(){
    this.description=''
  }


}
