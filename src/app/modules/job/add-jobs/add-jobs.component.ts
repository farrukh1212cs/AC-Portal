import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateJobDto } from '../CreateJobsDto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JobDTO } from 'src/app/core/interfaces';
import { UtilityService } from 'src/app/core/services/shared/UtilityService';
import { Subscription } from 'rxjs';
import { CreatePhoneNumbersDto } from 'src/app/modules/contact/CreatePhoneNumbersDto';
import { JobService } from 'src/app/core/services/job.service';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css'],
})
export class AddJobsComponent implements OnInit {
  private subscriptions: Subscription = new Subscription();
  officeLocationDropdownValues: any = [];
  public model: any = {};
  public modelMain: any = {};
  jobForm!: FormGroup;
  phoneNumbersForm!: FormGroup;
  JobDto?: CreateJobDto;
  phoneTypes: any[] = [];
  phoneNumbers: {
    id: string;
    phoneNumber: string;
    typeId: string;
    typeName: string;
  }[] = [];
  ph: CreatePhoneNumbersDto[] = [];
  //-----------DropDowns
  updateData: any = {};
  //-----------DropDowns
  salesReps: any;
  officeLocations: any;
  workflows: any;
  statuses: any;
  subcontractors: any;
  RelatedContactId: any;
  TeamMememberId: any;
  sources: any;
  states: any;
  @ViewChild('fileInput') fileInput: any;
  PrimaryContacts: any;

  constructor(
    private dialogRef: MatDialogRef<AddJobsComponent>,
    private jobService: JobService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private utilityService: UtilityService,
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService
  ) {
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
    this.phoneNumbersForm = new FormGroup({
      phoneNumber: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      typeId: new FormControl('', Validators.required),
    });

    this.jobForm = new FormGroup({
      id: new FormControl(0),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      city: new FormControl(''),
      zipCode: new FormControl(''),
      faxNo: new FormControl(''),
      officeNumber: new FormControl(''),
      homeNumber: new FormControl(''),
      mobileNumber: new FormControl(''),
      name: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      discription: new FormControl(''),
      sourceId: new FormControl(''),
      stateId: new FormControl(''),
      salesRepId: new FormControl('', Validators.required),
      subContractorId: new FormControl(''),
      primaryContactId: new FormControl(''),
      TeamMememberId: new FormControl([]),
      officeLocationId: new FormControl('', Validators.required),
      workFlowId: new FormControl('', Validators.required),
      statusId: new FormControl('', Validators.required),
      lastStatusChangeDate: new FormControl(new Date()),
      RelatedContactId: new FormControl([]),
      tags: new FormControl([]),
      note: new FormGroup({
        text: new FormControl(''),
      }),
      phoneNumbers: this.formBuilder.array([this.createPhoneNumberFormGroup()]),
      customFields: this.formBuilder.array([
        //this.createCustomFieldFormGroup()
      ]),
    });
    Promise.all([
      this.getOfficeLocation(),
      this.getSalesRep(),
      this.getWorkflows(),
      this.getAllcontacts(),
      this.getStatuses(),
      this.getSubcontractors(),
      this.getRelatedcontacts(),
      this.getTeamMembers(),
      this.getSources(),
      this.getState(),
      this.getPhoneTypes(),
    ])
      .then(() => {
        if (this.updateData.id) {
          console.log('Update Data: ', this.jobForm, this.updateData);
          this.jobForm.patchValue({
            id: this.updateData.id,
            addressLine1: this.updateData.address1,
            addressLine2: this.updateData.address2,
            city: this.updateData.city,
            zipCode: this.updateData.zip,
            name: this.updateData.name,
            startDate: this.updateData.startDate,
            endDate: this.updateData.endDate,
            discription: this.updateData.description,
            sourceId: this.updateData.leadSourceId,
            stateId: this.updateData.stateId,
            salesRepId: this.updateData.salesRepsentativeId,
            subContractorId: this.updateData.subContractorId,
            officeLocationId: this.updateData.officeLocationId,
            primaryContactId: this.updateData.primaryContactId,
            workFlowId: this.updateData.workFlowId,
            statusId: this.updateData.jobStatusId,
            faxNo: this.updateData.faxNo,
            officeNumber: this.updateData.officeNo,
            homeNumber: this.updateData.homeNo,
            mobileNumber: this.updateData.mobileNo,
            TeamMememberId: this.updateData.TeamMememberId,
            lastStatusChangeDate: this.updateData.lastStatusChangeDate,
          });
          
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching data:', error);
      });
  }

  createPhoneNumberFormGroup(): FormGroup {
    return new FormGroup({
      typeId: new FormControl(''),
      phoneNumber: new FormControl(''),
      typeName: new FormControl(''),
    });
  }

  addPhoneNumber(types: any): void {
    const phoneNumber = this.phoneNumbersForm.value.phoneNumber
      .toString()
      .trim();
    const typeId = this.phoneNumbersForm.value.typeId;
    const id = this.phoneNumbersForm.value.id;
    const typeName = types.find((x: any) => x.id === typeId)?.value;
    if (!phoneNumber || !typeId) {
      return;
    }
    // Check if the phoneNumber already exists in the phoneNumbers array and remove it
    const existingPhoneNumberIndex = this.phoneNumbers.findIndex(
      (pn) => pn.phoneNumber === phoneNumber
    );
    if (existingPhoneNumberIndex >= 0) {
      this.phoneNumbers.splice(existingPhoneNumberIndex, 1);
    }
    // Add the new phoneNumber to the phoneNumbers array
    this.phoneNumbers.push({ phoneNumber, typeId, typeName, id });
    this.phoneNumbersForm.reset();
  }

  removePhoneNumber(phoneNumber: string): void {
    const index = this.phoneNumbers.findIndex(
      (pn) => pn.phoneNumber === phoneNumber
    );
    if (index >= 0) {
      this.phoneNumbers.splice(index, 1);
    }
  }

  getOfficeLocation() {
    this.subscriptions.add(
      this.jobService.allOfficeLocations().subscribe(
        (res) => {
          this.officeLocationDropdownValues = res.payload;
        },
        (err) => {
          console.log(err);
        }
      )
    );
  }

  onSubmit(requestType: string): void {
    this.jobForm.markAllAsTouched();
    if (this.jobForm.valid) {
      this.JobDto = this.jobForm.value;
      const requestBody: JobDTO = {
        id: this.JobDto.id,
        address1: this.JobDto.addressLine1,
        address2: this.JobDto.addressLine2,
        city: this.JobDto.city,
        zip: this.JobDto.zipCode,
        faxNo: this.JobDto.faxNo,
        mobileNo: this.JobDto.mobileNumber,
        officeNo: this.JobDto.officeNumber,
        homeNo: this.JobDto.homeNumber,
        name: this.JobDto.name,
        stateId: this.JobDto.stateId,
        startDate: new Date(this.JobDto.startDate).toISOString(),
        endDate: new Date(this.JobDto.endDate).toISOString(),
        description: this.JobDto.discription,
        leadSourceId: Number(this.JobDto.sourceId?? "0"),
        salesRepsentativeId: this.JobDto.salesRepId,
        officeLocationId: this.JobDto.officeLocationId,
        workFlowId: this.JobDto.workFlowId,
        subContractorId: this.JobDto.subContractorId,
        teamMememberId: this.JobDto.TeamMememberId,
        relatedContactId: this.JobDto.RelatedContactId,
        lastStatusChangeDate: new Date(this.JobDto.lastStatusChangeDate).toISOString(),
        primaryContactId: this.JobDto.primaryContactId,
        jobStatusId: this.JobDto.statusId,
        phoneNo: '',
        jobType: "",
        note: this.JobDto.note?.text??""
      };
      if (requestType === 'Add') {
        this.subscriptions.add(
          this.jobService.createJob(requestBody, this.phoneNumbers).subscribe({
            next: (res) => {
              this.utilityService.showSuccessSnackBar(
                'Record inserted successfully'
              );
              this.router.navigate(['/jobs']);
              this.dialogRef.close();
            },
            error: (err) => {
              console.log(err);
              this.utilityService.showErrorSnackBar(
                'Error occured while adding job.'
              );
              this.router.navigate(['/jobs']);
              this.dialogRef.close();
            },
          })
        );
      } else {
        this.subscriptions.add(
          this.jobService.updateJob(requestBody, this.phoneNumbers).subscribe({
            next: (res) => {
              this.utilityService.showSuccessSnackBar(
                'Record updated successfully.'
              );
              this.router.navigate(['/jobs']);
              this.dialogRef.close();
            },
            error: (err) => {
              console.log(err);
              this.utilityService.showErrorSnackBar(
                'Error occured while updating record.'
              );
              this.router.navigate(['/jobs']);
              this.dialogRef.close();
            },
          })
        );
      }
    }
  }

  getSalesRep() {
    this.subscriptions.add(
      this.jobService.allSalesRep().subscribe({
        next: (res) => {
          this.salesReps = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getWorkflows() {
    this.subscriptions.add(
      this.jobService.allWorkFlows().subscribe({
        next: (res) => {
          this.workflows = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getStatuses() {
    this.subscriptions.add(
      this.jobService.allStatus().subscribe({
        next: (res) => {
          this.statuses = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getSubcontractors() {
    this.subscriptions.add(
      this.jobService.allSubcontractors().subscribe({
        next: (res) => {
          this.subcontractors = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getRelatedcontacts() {
    this.subscriptions.add(
      this.jobService.allRelatedContacts().subscribe({
        next: (res) => {
          this.RelatedContactId = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getAllcontacts() {
    this.subscriptions.add(
      this.contactService.allResult().subscribe({
        next: (res) => {
          console.log("Contacts: ", res.payload);
          this.PrimaryContacts = res.payload.map(contact => ({
            id: contact.id,
            name: contact.firstName + ' ' + contact.lastName
          }));
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getTeamMembers() {
    this.subscriptions.add(
      this.jobService.allTeamMembers().subscribe({
        next: (res) => {
          this.TeamMememberId = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getPhoneTypes() {
    this.subscriptions.add(
      this.jobService.allphoneTypes().subscribe({
        next: (res) => {
          const sourcePhoneTypes = res.payload[0].dropDown.find(
            (dropdown: any) => dropdown.dropDownName === 'MobileType'
          );
          this.phoneTypes = sourcePhoneTypes.dropDownValues;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  getSources() {
    this.subscriptions.add(
      this.jobService.allSource().subscribe({
        next: (res) => {
          const sourceTypeDropdown = res.payload[0].dropDown.find(
            (dropdown: any) => dropdown.dropDownName === 'SourceType'
          );
          this.sources = sourceTypeDropdown.dropDownValues;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
  getState() {
    this.subscriptions.add(
      this.jobService.allState().subscribe({
        next: (res) => {
          this.states = res.payload;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
