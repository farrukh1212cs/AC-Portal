import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddJobsComponent } from '../add-jobs/add-jobs.component';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';
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
    this.jobService.getAllJobsByCompanyID().subscribe(
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

  //openAddJobsModal() {
  //  this.dialog.open(AddJobsComponent);
  //}

  openAddJobsModal(data:any): void {
    let dialogRef: any = {};
    if (data == null) {
      data = {};
      data.FormTitle = "Add Job";
      data.Request_Type = "Add";
      dialogRef = this.dialog.open(AddJobsComponent, {
        width: '80vw',
        height: '80vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result:any) => {
      });
    }
    else {
      data = data[0];
      data.FormTitle = "Update Job";
      data.Request_Type = "Edit";
      dialogRef = this.dialog.open(AddJobsComponent, {
        width: '80vw',
        height: '80vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result: any) => {
      });
    }
  }

  openWorkflowModal(data:any): void {
    let dialogRef: any = {};
    if (data == null) {
      data = {};
      data.FormTitle = "Add Workflow";
      data.Request_Type = "Add";
      dialogRef = this.dialog.open(AddWorkflowComponent, {
        width: '40vw',
        height: '70vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result:any) => {
      });
    }
    else {
      data = data[0];
      data.FormTitle = "Update Job";
      data.Request_Type = "Edit";
      dialogRef = this.dialog.open(AddWorkflowComponent, {
        width: '40vw',
        height: '70vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result: any) => {
      });
    }
  }


  redirect(jobs:any){
     this.router.navigate(['/jobs', jobs.id], { state: { model: jobs }});
  
  };
}
