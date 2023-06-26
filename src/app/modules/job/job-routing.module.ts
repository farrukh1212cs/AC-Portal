import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { JobDetailsComponentComponent } from './job-details-component/job-details-component.component';
import { JobsLogbookComponent } from './jobs-logbook/jobs-logbook.component';
import { FinancialsComponent } from './financials/financials.component';
import { EventsComponent } from './events/events.component';
import { WorkOrderComponent } from './work-order/work-order.component';

const routes: Routes = [
  { path: '', component: JobsComponent },
  {
    path: ':id',
    component: JobDetailsComponentComponent,
    children: [
      { path: 'logbook', component: JobsLogbookComponent },
      { path: 'financials', component: FinancialsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'workorder', component: WorkOrderComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class JobRoutingModule {}
