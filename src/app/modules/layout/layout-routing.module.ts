import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('src/app/modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('src/app/modules/contact/contact.module').then(m => m.ContactModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
