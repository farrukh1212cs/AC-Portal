import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuradService } from './core/rootservices/AuthGuradService';
import { HomeComponent } from './dashboard/home/home.component';

const routes: Routes = [
  {path: '', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)},
  {path: 'contacts', canActivate: [AuthGuradService],
   loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)},
   {path: 'jobs', canActivate: [AuthGuradService],
   loadChildren: () => import('./job/job.module').then(m => m.JobModule)},
  {path: 'home'
  , canActivate: [AuthGuradService]
  , component: HomeComponent},
  {
    path: '**'
    , loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
