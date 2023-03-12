import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';
import { JobService } from '../job.service';

@Component({
  selector: 'app-add-jobs',
  templateUrl: './add-jobs.component.html',
  styleUrls: ['./add-jobs.component.css']
})
export class AddJobsComponent {
  officeLocationDropdownValues: any = [];

  constructor(private dialogRef: MatDialogRef<AddJobsComponent>, private jobService: JobService, private dialog: MatDialog) {


  }

  closeAddContactsModal() {
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
        this.officeLocationDropdownValues = res.payload;
      },
      err => {
        alert(err);
      },
      () => {

      }
    );
  }

  //createNewContact() {
  //  const newContact: CreateContactDto = {
  //    firstName: 'John',
  //    lastName: 'Doe',
  //    company: 'Acme Inc.'

  //    // ... other properties of CreateContactDto
  //  };

  //  this.contactService.createContact(newContact).subscribe(
  //    (response) => {
  //      console.log(response);
  //      // handle success response
  //    },
  //    (error) => {
  //      console.log(error);
  //      // handle error response
  //    }
  //  );
  //}
}
