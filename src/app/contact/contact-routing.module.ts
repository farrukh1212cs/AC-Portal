import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from '../account/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';


const routes: Routes = [
  {path: '', component: ContactsComponent},
  {path: 'contact', component: ContactsComponent},
  {path: 'contactdetails', component: ContactdetailComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactRoutingModule { }
