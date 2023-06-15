import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../core/services/job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEvetDto, EventDTO } from '../createEventDto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-job-event',
  templateUrl: './add-job-event.component.html',
  styleUrls: ['./add-job-event.component.css'],
})
export class AddJobEventComponent implements OnDestroy {
  subscription: Subscription
  public model: any = {};
  public modelMain: any = {};
  updateData: any = {};
  Jobs: any[] = [];
  eventForm!: FormGroup;
  eventDto: EventDTO;

  constructor(
    private dialogRef: MatDialogRef<AddJobEventComponent>,
    private jobService: JobService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (data) {
      this.modelMain = data;
      this.updateData = Object.assign({}, this.modelMain);
    }
  }

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      eventType: [''],
      eventPriority: [''],
      eventName: [''],
      startDate: [''],
      endDate: [''],
      estimatedDuration: [''],
      description: [''],
      tags: [''],
      lastStatusChangeDate: [''],
      jobId: [''],
      id: [''],
    });
    this.getAllJobs()
  }

  getAllJobs() {
    this.subscription = this.jobService.getAllJobsByCompanyID().subscribe(
      (res: any) => {
        this.Jobs = res.map((job: { id: number; name: string }) => {
          return { id: job.id, name: job.name };
        });
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  closeAddJobsModal() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.eventForm.markAllAsTouched();
    if (this.eventForm.valid) {
      this.eventDto = this.eventForm.value;
      const data: EventDTO = {
        eventType: this.eventDto.eventType,
        eventPriority: this.eventDto.eventPriority,
        eventName: this.eventDto.eventName,
        eventStatus: this.eventDto.eventStatus ?? 'Pending',
        startDate: this.eventDto.startDate,
        endDate: this.eventDto.endDate,
        estimatedDuration: this.eventDto.estimatedDuration,
        description: this.eventDto.description,
        tags: this.eventDto.tags,
        lastStatusChangeDate: this.eventDto.lastStatusChangeDate,
        jobId: this.eventDto.jobId,
      };
      const lastStatusChange =
        this.eventDto?.lastStatusChangeDate == ''
          ? new Date()
          : this.eventDto?.lastStatusChangeDate;
      data.lastStatusChangeDate = new Date(lastStatusChange).toISOString();
      this.subscription = this.jobService.createEvent(data).subscribe({
        next: (res) => {
          this.snackBar.open('Record inserted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar'],
          });
          this.router.navigate(['/jobs']);
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('Error', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
          this.dialogRef.close();
        },
      });
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
