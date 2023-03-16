import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent implements OnInit {
  officeLocationDropdownValues: any = [];
  public model: any = {};
  public modelMain: any = {};
  jobForm!: FormGroup;
  JobDto?: CreateJobDto;
  //-----------DropDowns
  public salesReps: any;
  public officeLocations: any;
  public workflows: any;
  public statuses: any;
  public subcontractors: any;
  public relatedcontacts: any;
  public teamMembers: any;
  public sources: any;
  public states: any;
  @ViewChild('fileInput') fileInput: any;

  constructor(private dialogRef: MatDialogRef<AddJobsComponent>, private jobService: JobService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) {
    debugger;
    this.modelMain = data;
    this.model = Object.assign({}, this.modelMain);
  }

  closeAddJobsModal() {
    this.dialogRef.close();
  }


  get phoneNumbers(): FormArray {
    return this.jobForm.get('phoneNumbers') as FormArray;
  }

  get customFields(): FormArray {
    return this.jobForm.get('customFields') as FormArray;
  }
  ngOnInit(): void {
    Promise.all([
      this.getOfficeLocation(),
      this.getSalesRep(),
      this.getWorkflows(),
      this.getStatuses(),
      this.getSubcontractors(),
      this.getRelatedcontacts(),
      this.getTeamMembers(),
      this.getSources(),
      this.getState()
    ]).then(() => {
      // All asynchronous functions have completed
    }).catch((error) => {
      console.error('An error occurred while fetching data:', error);
    });
    this.jobForm = this.formBuilder.group({
      address1: [''],
      address2: [''],
      city: [''],
      zip: [''],
      name: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
      leadSource: [''],
      state: [''],
      salesRepId: ['', Validators.required],
      officeLocationId: ['', Validators.required],
      workFlowId: ['', Validators.required],
      jobStatus: ['', Validators.required],
      primaryContactId: [[]],
      zipCode: [''],
      email: ['', Validators.email],
      website: [''],
      faxNo: [''],
      displayName: [''],
      discription: [''],
      file: [''],
      sourceId: [''],
      stateId: [''],
      subContractorId: [[]],
      teamMembers: [[]],
      statusId: ['', Validators.required],
      relatedContacts: [[]],
      tags: [[]],
      note: this.formBuilder.group({
        text: ['']
      }),
      phoneNumbers: this.formBuilder.array([
        this.createPhoneNumberFormGroup()
      ]),
      customFields: this.formBuilder.array([
        this.createCustomFieldFormGroup()
      ])
    });
  }

  createPhoneNumberFormGroup(): FormGroup {
    return this.formBuilder.group({
      type: [''],
      number: ['']
    });
  }
  addPhoneNumber(): void {
    const phoneNumbers = this.jobForm.get('phoneNumbers') as FormArray;
    phoneNumbers.push(this.createPhoneNumberFormGroup());
  }
  removePhoneNumber(index: number): void {
    const phoneNumbers = this.jobForm.get('phoneNumbers') as FormArray;
    phoneNumbers.removeAt(index);
  }

  createCustomFieldFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      value: ['']
    });
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

  onSubmit(): void {
    debugger;
    this.JobDto = this.jobForm.value;
    this.jobService.createJob(this.jobForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        alert(err);
      },
      () => {
      }
    );
    // Call your service to save the contact data
  }

  //-------------Callings
  getSalesRep() {
    this.jobService.allSalesRep().subscribe(
      res => {
        this.salesReps = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }
  getWorkflows() {
    this.jobService.allWorkFlows().subscribe(
      res => {
        this.workflows = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }
  getStatuses() {
    this.jobService.allStatus().subscribe(
      res => {
        this.statuses = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }
  //subcontractors
  getSubcontractors() {
    this.jobService.allSubcontractors().subscribe(
      res => {
        this.subcontractors = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }
  //relatedcontacts
  getRelatedcontacts() {
    this.jobService.allRelatedContacts().subscribe(
      res => {
        this.relatedcontacts = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }
  getTeamMembers() {
    this.jobService.allTeamMembers().subscribe(
      res => {
        this.teamMembers = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }

  getSources() {
    this.jobService.allSource().subscribe(
      res => {
        const sourceTypeDropdown = res.payload[0].dropDown.find((dropdown: any) => dropdown.dropDownName === "SourceType");
        this.sources = sourceTypeDropdown.dropDownValues;;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }
  getState() {
    this.jobService.allState().subscribe(
      res => {
        this.states = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }
//============================================
}
