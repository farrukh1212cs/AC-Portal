import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-details-component',
  templateUrl: './job-details-component.component.html',
  styleUrls: ['./job-details-component.component.css']
})
export class JobDetailsComponentComponent {
  job: any;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe(params => {
      const jobId =  params.get('id');
      this.job = history.state.model;
    });
  }
}
