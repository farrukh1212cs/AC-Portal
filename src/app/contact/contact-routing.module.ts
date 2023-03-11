import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';
import { LoginComponent } from '../account/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ContactdetailComponent } from './contactdetail/contactdetail.component';
import { AddcontactComponent } from './addcontact/addcontact.component';


const routes: Routes = [
 
  {path: '', component: ContactComponent, pathMatch: 'full'},
  {path: ':id', component: ContactdetailComponent},


  


]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class ContactRoutingModule { }
