import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddJobsComponent } from '../add-jobs/add-jobs.component';
import { JobService } from '../job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent {
  Jobs: any[] = [];
  constructor(private router: Router, private jobService: JobService,private dialog: MatDialog) {
    debugger;

 }
  ngOnInit() {
   this.getAllJobs();
  }


  getAllJobs()
  {
    this.jobService.allJobs().subscribe(
      res => {
        debugger;
        this.Jobs = res;
      },
      err => {
        alert(err);
      },
      () => {
       
      }
    );
  }

  openAddJobsModal() {
    this.dialog.open(AddJobsComponent);
  }
  redirect(jobs:any){
     this.router.navigate(['/jobs', jobs.id], { state: { model: jobs }});
  
  };
}
