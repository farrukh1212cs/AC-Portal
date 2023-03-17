import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobsComponent } from './jobs/jobs.component';
import { CoreModule } from '../core/core.module';
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

@NgModule({
  declarations: [
    JobsComponent,
    AddJobsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
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
    MatSnackBarModule
  ]
})
export class JobModule { }
