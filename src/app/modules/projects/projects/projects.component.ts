import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { DTOProject, JobDTO } from 'src/app/core/interfaces';
import { Subscription, forkJoin } from 'rxjs';
import { JobService } from 'src/app/core/services/job.service';
import { CsvExportService } from 'src/app/core/rootservices/csv-export-service.service';
import { ContactService } from 'src/app/core/services/contact.service';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
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
  projects: DTOProject[] = [];

  constructor(
    private router: Router,
    private jobService: JobService,
    private dialog: MatDialog,
    private csvExportService: CsvExportService,
    private contactService: ContactService,
    private projService: ProjectService,
  ) {}

  ngOnInit() {
    this.getAllProjects()
    // this.openAddProjectModal()
    // const salesRepObservable = this.jobService.allSalesRep();
    // const statusesObservable = this.jobService.allStatus();
    // const contactsObservable = this.contactService.allResult();
    // forkJoin([salesRepObservable, statusesObservable,contactsObservable]).subscribe({
    //   next: (results) => {
    //     const salesRepRes = results[0];
    //     const statusesRes = results[1];
    //     const contactsRes = results[2];
    //     this.salesReps = salesRepRes.payload;
    //     this.statuses = statusesRes.payload;
    //     this.allContacts = contactsRes.payload;

    //     // Now call getAllJobs()
    //     this.getAllJobs();
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  getAllProjects(pageNumber = 1, pageSize = 1000) {
    this.subscriptions.add(
      this.projService.getAllProjects().subscribe({
        next: (res: any) => {
          console.log(res)
          this.projects = res.payload
        },
        error: (err) => {
          console.log(err);
          const data: DTOProject[] = [{
            id: 1,
            projectName: 'Test Project 1',
            projectType: 'Test Type 1',
            projectColor: '#a897b7',
            background: '#a867b6',
            accessUserID: {id: 1, name: 'Access User 1'}
          },
          {
            id: 2,
            projectName: 'Test Project 2',
            projectType: 'Test Type 2',
            projectColor: '#a897b7',
            background: '#a867b6',
            accessUserID: {id: 2, name: 'Access User 2'}
          }
        ]
          this.projects = data
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

  openAddProjectModal(data: any = null): void {
    debugger
    if (data == null) {
      data = {
        FormTitle: 'Add Project',
        Request_Type: 'Add',
      };
    } else {
      data.FormTitle = 'Edit Project';
      data.Request_Type = 'Save';
    }

    const dialogRef = this.dialog.open(AddProjectComponent, {
      width: '60vw',
      height: '80vh',
      data: data,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getAllProjects();
    });
  }

  redirect(jobs: any) {
    return
    this.router.navigate(['/jobs', jobs.id], { state: { model: jobs } });
  }

  deleteProjectClick(data: any): void {
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
