import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { AddJobEventComponent } from '../add-job-event/add-job-event.component';
import { AddJobWorkOrderComponent } from '../add-job-work-order/add-job-work-order.component';
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
  phoneNumbers: { id: string, phoneNumber: string, typeId: string, typeName: string }[] = [];
  constructor(private router: Router, private jobService: JobService,private dialog: MatDialog) {

 }
  ngOnInit() {
   this.getAllJobs();
  }


  getAllJobs()
  {
    this.jobService.getAllJobsByCompanyID().subscribe(
      res => {
        this.Jobs = res;
      },
      err => {
        console.log(err);
      },
      () => {
       
      }
    );
  }

  // openAddJobsModal() {
  //  this.dialog.open(AddJobsComponent);
  // }

  openAddJobsModal(data:any): void {
    console.log(data);
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
      data.FormTitle = "Edit Job";
      data.Request_Type = "Save";
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

  redirect(jobs:any){
     this.router.navigate(['/jobs', jobs.id], { state: { model: jobs }});
  };

  deleteJobClick(data: any) : void { 
    let dialogRef: any = {};
    data.FormTitle = "Confirm Delete";
      data.Request_Type = "Delete";
      dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '30vw',
        height: '27vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result:any) => {
      });
  }
}
