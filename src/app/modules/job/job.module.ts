import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import this if you want to use the input component within MatFormField
import { MatSelectModule } from '@angular/material/select';
import { AddJobsComponent } from './add-jobs/add-jobs.component';
import { JobRoutingModule } from './job-routing.module';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { TagInputModule } from 'ngx-chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddWorkflowComponent } from './add-workflow/add-workflow.component';
import { AddJobEventComponent } from './add-job-event/add-job-event.component';
import { AddJobWorkOrderComponent } from './add-job-work-order/add-job-work-order.component';
import { JobDetailsComponentComponent } from './job-details-component/job-details-component.component';
import { CoreModule } from 'src/app/core/core.module';
import { JobsLogbookComponent } from './jobs-logbook/jobs-logbook.component';
import { EventsComponent } from './events/events.component';
import { FinancialsComponent } from './financials/financials.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow/workflow.component';

@NgModule({
  declarations: [
    JobsComponent,
    AddJobsComponent,
    AddWorkflowComponent,
    AddJobEventComponent,
    AddJobWorkOrderComponent,
    JobDetailsComponentComponent,
    JobsLogbookComponent,
    EventsComponent,
    FinancialsComponent,
    WorkOrderComponent,
    WorkflowComponent,
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    TagInputModule,
    MatMenuModule,
    MatSnackBarModule,
    CoreModule,
    RouterModule
  ]
})
export class JobModule { }
