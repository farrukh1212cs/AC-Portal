import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    ]).then(() => {
      // All asynchronous functions have completed
      if (this.updateData.contact?.firstName) {
        this.jobForm.patchValue({
          id: this.updateData.contact?.id,
          firstName: this.updateData.contact?.firstName,
          lastName: this.updateData.contact?.lastName,
          company: this.updateData.contact?.company,
          addressLine1: this.updateData.contact?.addressLine1,
          addressLine2: this.updateData.contact?.addressLine2,
          city: this.updateData.contact?.city,
          zipCode: this.updateData.contact?.zipCode,
          email: this.updateData.contact?.email,
          website: this.updateData.contact?.website,
          faxNo: this.updateData.contact?.faxNo,
          displayName: this.updateData.contact?.displayName,
          startDate: this.updateData.contact?.startDate,
          endDate: this.updateData.contact?.endDate,
          description: this.updateData.contact?.description,
          file: this.updateData.contact?.file,
          sourceId: this.updateData.contact?.source?.id,
          stateId: this.updateData.contact?.state?.id,
          salesRepId: this.updateData.contact?.salesRep?.id,
          subContractorId: this.updateData.contact?.subContractor?.id,
          teamMembers: this.updateData.contact?.teamMembers?.map((contact: any) => contact.id),
          officeLocationId: this.updateData.contact?.officeLocation.id,
          workFlowId: this.updateData.contact?.workFlow?.id,
          statusId: this.updateData.contact?.status?.id,
          relatedContacts: this.updateData.contact?.relatedContacts?.map((contact: any) => contact.id),
          tags: this.updateData?.contact?.tags?.map((tagd: any) => ({
            display: tagd.tag,
            value: tagd.tag
          })),
          note: {
            text: this.updateData.contact?.note?.text
          },
        });
      }
    }).catch((error) => {
      console.error('An error occurred while fetching data:', error);
    });
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
      this.jobService.createJob(this.jobForm.value).subscribe(
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
    // Call your service to save the contact data
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
