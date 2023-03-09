import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';

const routes: Routes = [
  {path: '', component: JobsComponent},
  {path: 'job', component: JobsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class JobRoutingModule { }
