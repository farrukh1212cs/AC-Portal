import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { AddJobEventComponent } from '../add-job-event/add-job-event.component';
import { AddJobWorkOrderComponent } from '../add-job-work-order/add-job-work-order.component';
import { AddJobsComponent } from '../add-jobs/add-jobs.component';
import { AddWorkflowComponent } from '../add-workflow/add-workflow.component';
import { JobService } from '../../core/services/job.service';
import { JobDTO } from 'src/app/core/interfaces';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent {
  statuses: any[] = [];
  // salesRepsentativeId
  // primaryContactId
  subscriptions: Subscription = new Subscription();

  Jobs: JobDTO[] = [];
  phoneNumbers: {
    id: string;
    phoneNumber: string;
    typeId: string;
    typeName: string;
  }[] = [];
  salesReps: any[] = [];

  constructor(
    private router: Router,
    private jobService: JobService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const salesRepObservable = this.jobService.allSalesRep();
    const statusesObservable = this.jobService.allStatus();
    forkJoin([salesRepObservable, statusesObservable]).subscribe({
      next: (results) => {
        const salesRepRes = results[0];
        const statusesRes = results[1];
        this.salesReps = salesRepRes.payload;
        this.statuses = statusesRes.payload;

        // Now call getAllJobs()
        this.getAllJobs();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllJobs(pageNumber = 1, pageSize = 25) {
    this.jobService.getAllJobsWithPagination(pageNumber, pageSize).subscribe({
      next: (res: any) => {
        console.log(res);
        this.Jobs = [];
        this.Jobs = res;
        const statusesMap = new Map<number, string>();
        this.statuses.forEach((status) => {
          statusesMap.set(status.id, status.statusName);
        });

        const salesRepsMap = new Map<number, string>();
        this.salesReps.forEach((salesRep) => {
          salesRepsMap.set(salesRep.id, salesRep.name);
        });

        this.Jobs.forEach((x) => {
          x.jobStatus = statusesMap.get(x.jobStatusId) || '';
          x.workFlow = statusesMap.get(x.workFlowId) || '';
          x.salesRepName = salesRepsMap.get(x.salesRepsentativeId) || '';
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getSalesRep() {
    this.subscriptions.add(
      this.jobService.allSalesRep().subscribe({
        next: (res) => {
          this.salesReps = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getStatuses() {
    this.subscriptions.add(
      this.jobService.allStatus().subscribe({
        next: (res) => {
          this.statuses = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  openAddJobsModal(data: any): void {
    if (data == null) {
      data = {
        FormTitle: 'Add Job',
        Request_Type: 'Add',
      };
    } else {
      data.FormTitle = 'Edit Job';
      data.Request_Type = 'Save';
    }
  
    const dialogRef = this.dialog.open(AddJobsComponent, {
      width: '80vw',
      height: '80vh',
      data: data,
      disableClose: true,
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getAllJobs();
    });
  }
  

  redirect(jobs: any) {
    debugger;
    this.router.navigate(['/jobs', jobs.id], { state: { model: jobs } });
  }

  deleteJobClick(data: any): void {
    let dialogRef: any = {};
    data.FormTitle = 'Confirm Delete';
    data.Request_Type = 'Delete';
    dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '30vw',
      height: '27vh',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {});
  }
}
