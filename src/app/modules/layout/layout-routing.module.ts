import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuradService } from 'src/app/core/rootservices/AuthGuradService';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('src/app/modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('src/app/modules/contact/contact.module').then(
            (m) => m.ContactModule
          ),
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('src/app/modules/job/job.module').then((m) => m.JobModule),
      },
    ],
    canActivate: [AuthGuradService],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/account/account.module').then((m) => m.AccountModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
