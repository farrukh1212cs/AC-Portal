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
      data.FormTitle = "Update Job";
      data.Request_Type = "Update";
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
      data.FormTitle = "Update Workflow";
      data.Request_Type = "Update";
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

  openEventModal(data: any): void {
    let dialogRef: any = {};
    if (data == null) {
      data = {};
      data.FormTitle = "Add Event";
      data.Request_Type = "Add";
      dialogRef = this.dialog.open(AddJobEventComponent, {
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
      data.FormTitle = "Update Event";
      data.Request_Type = "Update";
      dialogRef = this.dialog.open(AddJobEventComponent, {
        width: '40vw',
        height: '70vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result: any) => {
      });
    }
  }

  openWorkOrderModal(data: any): void {
    let dialogRef: any = {};
    if (data == null) {
      data = {};
      data.FormTitle = "Add WorkOrder";
      data.Request_Type = "Add";
      dialogRef = this.dialog.open(AddJobWorkOrderComponent, {
        width: '70vw',
        height: '70vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result:any) => {
      });
    }
    else {
      data = data[0];
      data.FormTitle = "Update Workorder";
      data.Request_Type = "Update";
      dialogRef = this.dialog.open(AddJobWorkOrderComponent, {
        width: '70vw',
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

  deleteJobClick(data: any) : void { 
    let dialogRef: any = {};
    data.FormTitle = "Confirm Delete";
      data.Request_Type = "Delete";
      dialogRef = this.dialog.open(ConfirmationComponent, {
        width: '60vw',
        height: '30vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result:any) => {
      });
  }
}
