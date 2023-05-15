import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { createWorkOrderDto } from '../createWorkOrderDto';

enum Priorities {
  High = "High",
  Medium = "Medium",
  Low = "Low" 
}

@Component({
  selector: 'app-add-job-work-order',
  templateUrl: './add-job-work-order.component.html',
  styleUrls: ['./add-job-work-order.component.css']
})
export class AddJobWorkOrderComponent {
  public model: any = {};
  public modelMain: any = {};
  updateData: any = {};
  Jobs: any[] = [];
  workOrderForm!: FormGroup;
  workOrderDto?: createWorkOrderDto;
  priorities = Priorities;
  prioritykeys: string[] = [];

  constructor(private dialogRef: MatDialogRef<AddJobWorkOrderComponent>, private jobService: JobService, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    if (data) {
      this.modelMain = data;
      this.updateData = Object.assign({}, this.modelMain);
    }

    this.prioritykeys = Object.keys(this.priorities);
  }

  ngOnInit(): void {
    this.workOrderForm = this.formBuilder.group({
      workOrderPriority: [''],
      name: [''],
      workOrderStatus: [''],
      startDate: [''],
      dueDate: [''],
      notes: [''],
      lastStatusChangeDate: [''],
      contactId: [''],
      jobId: [''],
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
        this.Jobs = res.map((job: { id: number, name: string, subContractorId: number }) => {
          return {id: job.id, name: job.name, contactId: job.subContractorId}
        })
      },
      err => {
        console.log(err);
      },
      () => {
       
      }
    );
  }

  closeAddWorkOrderModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.workOrderForm.markAllAsTouched();
    if (this.workOrderForm.valid) {
      this.workOrderDto = this.workOrderForm.value;
      this.jobService.createWorkOrder(this.workOrderForm.value).subscribe(
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
