import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactService } from '../contact.service';
import { MatCardModule } from '@angular/material/card';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent {
  officeLocationDropdownValues :any =  [];

  constructor(private dialogRef: MatDialogRef<AddcontactComponent>,private contactService: ContactService,private dialog: MatDialog) {


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
  getOfficeLocation(){
    this.contactService.allOfficeLocations().subscribe(
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
}
