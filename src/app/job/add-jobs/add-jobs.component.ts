import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent {
  officeLocationDropdownValues: any = [];
  public model: any = {};
  public modelMain: any = {};

  constructor(private dialogRef: MatDialogRef<AddJobsComponent>, private jobService: JobService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,) {
    debugger;
    this.modelMain = data;
    this.model = Object.assign({}, this.modelMain);

  }

  closeAddJobsModal() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.getOfficeLocation();
  }
  saveData() {
    // Your code to save user's data to the database goes here

    // Close the dialog
    this.dialogRef.close();
  }
  //------------------
  getOfficeLocation() {
    this.jobService.allOfficeLocations().subscribe(
      res => {
        debugger;
        this.officeLocationDropdownValues = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }

  createNewJob() {
    debugger;
    const newJob: CreateJobDto = {
      id: this.model.id,
      name: this.model.name,
      address1: this.model.address1,
      address2: this.model.address2,
      city: this.model.city,
      state: this.model.state,
      zip: this.model.zip,
      jobStatus: this.model.jobStatus,
      startDate: this.model.startDate,
      endDate: this.model.endDate,
      leadSource: this.model.leadSource,
      salesRepId: this.model.salesRepId,
      officeLocationId: this.model.officeLocationId,
      workFlowId: this.model.workFlowId,

      // ... other properties of CreateJobDto
    };

    this.jobService.createJob(newJob).subscribe(
      (response) => {
        console.log(response);
        // handle success response
      },
      (error) => {
        console.log(error);
        // handle error response
      }
    );
  }
}
