import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent {

  constructor(private contactService: ContactService,private dialog: MatDialog) {


  }

  closeAddContactsModal() {
    this.dialog.closeAll();
  }
}
