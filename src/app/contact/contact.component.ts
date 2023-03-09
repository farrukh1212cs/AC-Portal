import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
       console.log(res);
      },
      err => {
        alert("UserName Or Password Is Invalid!");
      },
      () => {
       
      }
    );
  }

  openAddContactsModal() {
    this.dialog.open(AddcontactComponent);
  }
   redirect(contact:any){
    this.router.navigate(['/contact', contact.id], { state: { model: contact }});
  
  };
}
