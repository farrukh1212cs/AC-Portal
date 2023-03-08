import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from '../account/login/login.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', component: ContactsComponent},
  {path: 'contact', component: ContactsComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactRoutingModule { }
