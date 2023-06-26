import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jobs-logbook',
  templateUrl: './jobs-logbook.component.html',
  styleUrls: ['./jobs-logbook.component.css']
})
export class JobsLogbookComponent {
  jobId: any;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe(params => {
      this.jobId = history.state.jobId;
      console.log(this.jobId)
    });
  }
}
