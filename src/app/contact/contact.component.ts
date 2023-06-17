import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { ContactService } from '../core/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contacts: any[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(
    private router: Router,
    private contactService: ContactService,
    private dialog: MatDialog,
    private cRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getAllContacts();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this.subscriptions.unsubscribe();
  }

  getAllContacts() {
    const contactsSubscription = this.contactService.allResult().subscribe({
      next: (res) => {
        this.contacts = res.payload;
        this.cRef.detectChanges();
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.subscriptions.add(contactsSubscription);
  }

  redirect(contact: any) {
    this.router.navigate(['/contact', contact.id], {
      state: { model: contact },
    });
  }

  openAddContactModal(data: any): void {
    let dialogRef: any = {};
    if (data == null) {
      data = {};
      data.FormTitle = 'Add Contact';
      data.Request_Type = 'Add';
      dialogRef = this.dialog.open(AddcontactComponent, {
        width: '80vw',
        height: '80vh',
        data: data,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result: any) => {});
    } else {
      data.FormTitle = 'Edit Contact';
      data.Request_Type = 'Save';
      dialogRef = this.dialog.open(AddcontactComponent, {
        width: '80vw',
        height: '80vh',
        data: data,
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe((result: any) => {
        this.getAllContacts();
      });
    }
  }

  deleteContact(data: any) {
    const deleteSubscription = this.contactService
      .deleteContact(data.id)
      .subscribe({
        next: (res) => {
          alert('Deleted');
          this.getAllContacts();
        },
        error: (err) => console.error(err),
      });

    this.subscriptions.add(deleteSubscription);
  }
}
