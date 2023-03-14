import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';
import { CoreModule } from '../core/core.module';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Import this if you want to use the input component within MatFormField
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon'; 
import { TagInputModule } from 'ngx-chips';
import { MatMenuModule } from '@angular/material/menu';

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
    ContactRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule ,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatIconModule,
    TagInputModule,
    MatMenuModule 
  ]
})
export class ContactModule { }
