import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './add-project/add-project.component';



@NgModule({
  declarations: [
    ProjectsComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProjectsModule { }
