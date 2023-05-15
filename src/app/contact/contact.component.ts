import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { ContactService } from './contact.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
 
  contacts: any[] = [];
 constructor( private router: Router,private contactService: ContactService,private dialog: MatDialog) {


 }
  ngOnInit() {
   this.getAllContacts();
  }


  getAllContacts()
  {
    this.contactService.allResult().subscribe(
      res => {
        this.contacts = res.payload;
      },
      err => {
        console.log(err);
      },
      () => {
       
      }
    );
  }


  redirect(contact:any){
    this.router.navigate(['/contact', contact.id], { state: { model: contact }});
  };

  openAddContactModal(data:any): void {
    let dialogRef: any = {};
    if (data == null) {
      data = {};
      data.FormTitle = "Add Contact";
      data.Request_Type = "Add";
      dialogRef = this.dialog.open(AddcontactComponent, {
        width: '80vw',
        height: '80vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result:any) => {
      });
    }
    else {
      data.FormTitle = "Edit Contact";
      data.Request_Type = "Save";
      dialogRef = this.dialog.open(AddcontactComponent, {
        width: '80vw',
        height: '80vh',
        data: data,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe((result: any) => {
      });
    }
  }
}
