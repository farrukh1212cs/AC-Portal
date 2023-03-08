import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactRoutingModule } from './contact-routing.module';
import { CoreModule } from '../core/core.module';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ContactsComponent,
    AddcontactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    CoreModule,
    MatDialogModule
  ]
})
export class ContactModule { }
