import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddJobWorkOrderComponent } from '../add-job-work-order/add-job-work-order.component';
import { AddJobEventComponent } from '../add-job-event/add-job-event.component';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';

@Component({
  selector: 'app-job-details-component',
  templateUrl: './job-details-component.component.html',
  styleUrls: ['./job-details-component.component.css']
})
export class JobDetailsComponentComponent {
  job: any;

  constructor(private route: ActivatedRoute, private dialog: MatDialog,private router:Router) {
    this.route.paramMap.subscribe(params => {
      const jobId =  params.get('id');
      this.job = history.state.model;
      console.log(this.job, history)
    });
  }

  openWorkflowModal(data:any): void {
      let dialogRef: any = {};
      if (data == null) {
        data = {};
        data.FormTitle = "Add Workflow";
        data.Request_Type = "Add";
        dialogRef = this.dialog.open(AddWorkflowComponent, {
          width: '40vw',
          height: '50vh',
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
          height: '50vh',
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
          width: '50vw',
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
          width: '50vw',
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
          height: '50vh',
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
          height: '50vh',
          data: data,
          disableClose: true
        });
        dialogRef.afterClosed().subscribe((result: any) => {
        });
      }
    }

    redirectTO(route) {
      const fullRoute = `/jobs/${this.job.id}/`;
      const childRoute = route; // Child route path
      this.router.navigate([fullRoute, childRoute], { state: { data: this.job } });
    }
}
