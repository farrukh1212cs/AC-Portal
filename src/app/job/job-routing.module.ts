import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponentComponent } from './job-details-component/job-details-component.component';

const routes: Routes = [
  { path: '', component: JobsComponent, pathMatch: 'full'},
  { path: 'job', component: JobsComponent},
  { path: ':id', component: JobDetailsComponentComponent },
  
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class JobRoutingModule { }
