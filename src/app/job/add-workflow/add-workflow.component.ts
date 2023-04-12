import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePhoneNumbersDto } from '../../contact/CreatePhoneNumbersDto';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.css']
})
export class AddWorkflowComponent {
  public model: any = {};
  public modelMain: any = {};
  updateData: any = {};
  workFlowForm!: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddWorkflowComponent>, private jobService: JobService, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    if (data) {
      this.modelMain = data;
      this.updateData = Object.assign({}, this.modelMain);
    }
  }

  ngOnInit(): void {
    this.workFlowForm = this.formBuilder.group({
      name: [''],
      description: [''],
      jobId: ['']
    });
  }

  closeAddJobsModal() {
    this.dialogRef.close();
  }

  onSubmit() {
    alert("Success!");
  }
}
