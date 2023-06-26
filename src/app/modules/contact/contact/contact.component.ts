import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation.component';
import { CsvExportService } from 'src/app/core/rootservices/csv-export-service.service';
import { ContactService } from 'src/app/core/services/contact.service';
// import { ContactService } from '../contact.service';

import { AddcontactComponent } from 'src/app/modules/contact/addcontact/addcontact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contacts: any[] = [];
  constructor(
    private router: Router,
    private contactService: ContactService,
    private dialog: MatDialog,
    private csvExportService: CsvExportService
  ) {}
  ngOnInit() {
    this.getAllContacts();
  }

  getAllContacts() {
    this.contactService.allResult().subscribe({
     next: (res) => {
        this.contacts = res.payload;
      },
     error: (err) => {
        console.log(err);
      }}
    );
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
        width: '75vw',
        data: data,
        disableClose: true,
      });
    } else {
      data.FormTitle = 'Edit Contact';
      data.Request_Type = 'Save';
      dialogRef = this.dialog.open(AddcontactComponent, {
        width: '80vw',
        height: '80vh',
        data: data,
        disableClose: true,
      });
    }
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getAllContacts();
    });
  }

  deleteContact(contact: any) {
    let dialogRef: any = {};
    contact.FormTitle = 'Confirm Delete';
    contact.Request_Type = 'Delete';
    dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '30vw',
      height: '200px',
      data: contact,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.contactService.deleteContact(contact?.id).subscribe({
          next: (res) => {
            console.log(res);
            this.getAllContacts();
          },
          error: (res) => {
            console.log(res);
          },
        });
      }
    });
  }

  importContacts(): void {
    const fileInput = document.getElementById('csvFileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileSelection(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file && file.type === 'text/csv') {
      this.csvExportService.importCsvFile(file)
        .then((data: any[]) => {
          console.log(data);
          const headers = data[0]; // Get headers from the first array
          const contacts = data.slice(1).map((row: string[]) => {
            const contact: any = {};
            headers.forEach((header: string, index: number) => {
              contact[header] = row[index];
            });
            return contact;
          });
          // Handle imported contacts (array of objects) here
          console.log(contacts);
        })
        .catch((error: any) => {
          console.error('Error importing CSV:', error);
        });
    } else {
      console.error('Invalid file format. Please select a CSV file.');
    }
  }
}
