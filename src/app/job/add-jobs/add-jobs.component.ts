import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreatePhoneNumbersDto } from '../../contact/CreatePhoneNumbersDto';

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
  phoneNumbersForm!: FormGroup;
  JobDto?: CreateJobDto;
  phoneTypes: any[] = [];
  phoneNumbers: { id: string, phoneNumber: string, typeId: string, typeName: string }[] = [];
  ph: CreatePhoneNumbersDto[] = [];
  //-----------DropDowns
  updateData: any = {};
  //-----------DropDowns
  salesReps: any;
  officeLocations: any;
  workflows: any;
  statuses: any;
  subcontractors: any;
  relatedcontacts: any;
  teamMembers: any;
  sources: any;
  states: any;
  @ViewChild('fileInput') fileInput: any;

  constructor(private dialogRef: MatDialogRef<AddJobsComponent>, private jobService: JobService, @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute) {
    debugger;
    if (data) {
      this.modelMain = data;
      this.updateData = Object.assign({}, this.modelMain);
    }
  }
  get ssForm() {
    return this.jobForm.controls;
  }
  closeAddJobsModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    //----------PH
    this.phoneNumbersForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      type: ['', Validators.required],
      typeId: ['', Validators.required]
    });

    //---------
    this.jobForm = this.formBuilder.group({
      id: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      zipCode: [''],
      faxNo: [''],
      displayName: [''],
      startDate: [''],
      endDate: [''],
      discription: [''],
      sourceId: [''],
      stateId: [''],
      salesRepId: ['', Validators.required],
      subContractorId: [],
      teamMembers: [[]],
      officeLocationId: ['', Validators.required],
      workFlowId: ['', Validators.required],
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
        //this.createCustomFieldFormGroup()
      ])
    });
    Promise.all([
      this.getOfficeLocation(),
      this.getSalesRep(),
      this.getWorkflows(),
      this.getStatuses(),
      this.getSubcontractors(),
      this.getRelatedcontacts(),
      this.getTeamMembers(),
      this.getSources(),
      this.getState(),
      this.getPhoneTypes()
    ]).then(() => {
      // All asynchronous functions have completed
      if (this.updateData.job?.firstName) {
        this.jobForm.patchValue({
          id: this.updateData.job?.id,
          address1: this.updateData.job?.address1,
          address2: this.updateData.job?.address2,
          city: this.updateData.job?.city,
          zip: this.updateData.job?.zip,
          jobStatus: this.updateData.job?.jobStatus,
          name: this.updateData.job?.name,
          startDate: this.updateData.job?.startDate,
          endDate: this.updateData.job?.endDate,
          description: this.updateData.job?.description,
          leadSource: this.updateData.job?.leadSource?.id,
          state: this.updateData.job?.state?.id,
          salesRepId: this.updateData.job?.salesRep?.id,
          subContractorId: this.updateData.job?.subContractor?.id,
          teamMembers: this.updateData.job?.teamMembers?.map((job: any) => job.id),
          officeLocationId: this.updateData.job?.officeLocation.id,
          workFlowId: this.updateData.job?.workFlow?.id,
          statusId: this.updateData.job?.statusId?.id,
          relatedContacts: this.updateData.job?.relatedContacts?.map((job: any) => job.id),
          tags: this.updateData?.job?.tags?.map((tagd: any) => ({
            display: tagd.tag,
            value: tagd.tag
          })),
          note: {
            text: this.updateData.job?.note?.text
          },
        });
      }
    }).catch((error) => {
      console.error('An error occurred while fetching data:', error);
    });
  }

  //---------
  createPhoneNumberFormGroup(): FormGroup {
    return this.formBuilder.group({
      typeId: [''],
      phoneNumber: [''],
      typeName: ['']
    });
  }

  //----------
  addPhoneNumber(types: any): void {
    const phoneNumber = this.phoneNumbersForm.value.phoneNumber.trim();
    const typeId = this.phoneNumbersForm.value.typeId;
    const id = this.phoneNumbersForm.value.id;
    const typeName = types.find((x: any) => x.id === typeId).value;
    if (this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)) {
      const index = this.phoneNumbers.findIndex(pn => pn.phoneNumber === phoneNumber);
      if (index >= 0) {
        this.phoneNumbers.splice(index, 1);
      }
    }
    if (phoneNumber && typeId && !this.phoneNumbers.find(pn => pn.phoneNumber === phoneNumber)) {
      this.phoneNumbers.push({ phoneNumber, typeId, typeName, id });
      this.phoneNumbersForm.reset();
    }
  }
  removePhoneNumber(phoneNumber: string): void {
    const index = this.phoneNumbers.findIndex(pn => pn.phoneNumber === phoneNumber);
    if (index >= 0) {
      this.phoneNumbers.splice(index, 1);
    }
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
    this.jobForm.markAllAsTouched();
    if (this.jobForm.valid) {
      debugger;
      this.JobDto = this.jobForm.value
      this.jobService.createJob(this.jobForm.value, this.phoneNumbers).subscribe(
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
          console.log(err)
          this.snackBar.open('Error', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        },
        () => {
        }
      );
    }
    // Call your service to save the job data
  }//==================================================================

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
  getPhoneTypes() {
    this.jobService.allphoneTypes().subscribe(
      res => {
        const sourcePhoneTypes = res.payload[0].dropDown.find((dropdown: any) => dropdown.dropDownName === "MobileType");
        this.phoneTypes = sourcePhoneTypes.dropDownValues;;
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
