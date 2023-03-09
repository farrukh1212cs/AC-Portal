import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { CoreModule } from '../core/core.module';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ContactComponent,
    AddcontactComponent,
    ContactdetailComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
