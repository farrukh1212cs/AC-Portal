import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { AddJobsComponent } from '../add-jobs/add-jobs.component';
import { JobDTO } from 'src/app/core/interfaces';
import { Subscription, forkJoin } from 'rxjs';
import { JobService } from 'src/app/core/services/job.service';
import { CsvExportService } from 'src/app/core/rootservices/csv-export-service.service';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent {
  @ViewChild('myTable') table!: HTMLTableElement;

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
  allContacts: any;

  constructor(
    private router: Router,
    private jobService: JobService,
    private dialog: MatDialog,
    private csvExportService: CsvExportService,
    private contactService: ContactService,
  ) {}

  ngOnInit() {
    const salesRepObservable = this.jobService.allSalesRep();
    const statusesObservable = this.jobService.allStatus();
    const contactsObservable = this.contactService.allResult();
    forkJoin([salesRepObservable, statusesObservable,contactsObservable]).subscribe({
      next: (results) => {
        const salesRepRes = results[0];
        const statusesRes = results[1];
        const contactsRes = results[2];
        this.salesReps = salesRepRes.payload;
        this.statuses = statusesRes.payload;
        this.allContacts = contactsRes.payload;

        // Now call getAllJobs()
        this.getAllJobs();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getAllJobs(pageNumber = 1, pageSize = 1000) {
    this.subscriptions.add(
      this.jobService.getAllJobsWithPagination(pageNumber, pageSize).subscribe({
        next: (res: any) => {
          console.log(res);
          this.Jobs = [];
          this.Jobs = res;
          const statusesMap = new Map<number, string>();
          this.statuses.forEach((status) => {
            statusesMap.set(status.id, status.statusName);
          });
          this.statuses.forEach((status) => {
            statusesMap.set(status.id, status.statusName);
          });

          const salesRepsMap = new Map<number, string>();
          this.salesReps.forEach((salesRep) => {
            salesRepsMap.set(salesRep.id, salesRep.name);
          });

          const primaryContactMap = new Map<number, string>();
          this.allContacts.forEach((contact) => {
            primaryContactMap.set(contact.id, contact.name);
          });

          this.Jobs.forEach((x) => {
            x.jobStatus = statusesMap.get(x.jobStatusId) || '';
            x.workFlow = statusesMap.get(x.workFlowId) || '';
            x.salesRepName = salesRepsMap.get(x.salesRepsentativeId) || '';
            x.primaryContactName = primaryContactMap.get(x.primaryContactId) || '';
          });
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  exportTable() {
    this.csvExportService.exportTableToCsv(this.table, 'exported-data.csv');
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
    this.router.navigate(['/jobs', jobs.id], { state: { model: jobs } });
  }

  deleteJobClick(data: any): void {
    let dialogRef: any = {};
    data.FormTitle = 'Confirm Delete';
    data.Request_Type = 'Delete';
    dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '30vw',
      height: '200px',
      data: data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      debugger
      if (result) {
        this.jobService.deleteJob(data).subscribe({
          next: (res) => {
            console.log(res);
          },
        });
      }
    });
  }
}
