import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEvetDto } from '../createEventDto';

@Component({
  selector: 'app-add-job-event',
  templateUrl: './add-job-event.component.html',
  styleUrls: ['./add-job-event.component.css']
})
export class AddJobEventComponent {
  public model: any = {};
  public modelMain: any = {};
  updateData: any = {};
  Jobs: any[] = [];
  eventForm!: FormGroup;
  eventDto?: CreateEvetDto;

  constructor(private dialogRef: MatDialogRef<AddJobEventComponent>, private jobService: JobService, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
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
      id: ['']
    });

    Promise.all([
      this.getAllJobs()
    ]).then(() => {

    })
  }

  getAllJobs()
  {
    this.jobService.getAllJobsByCompanyID().subscribe(
      res => {
        this.Jobs = res.map((job: { id: number, name: string }) => {
          return {id: job.id, name: job.name}
        })
      },
      err => {
        console.log(err);
      },
      () => {
       
      }
    );
  }

  closeAddJobsModal() {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.eventForm.markAllAsTouched();
    if (this.eventForm.valid) {
      this.eventDto = this.eventForm.value;
      this.jobService.createEvent(this.eventForm.value).subscribe(
        res => {
          this.snackBar.open('Record inserted successfully', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/jobs']);
          this.dialogRef.close();
        },
        err => {
          console.log(err);
          this.snackBar.open('Error', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        }
      )
    }
  }
}
