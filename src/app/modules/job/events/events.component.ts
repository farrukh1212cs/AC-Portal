import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent {
  jobId: any;
  events: any;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private JobService: JobService,
    private cRef: ChangeDetectorRef
  ) {
    this.route.paramMap.subscribe((params) => {
      this.jobId = history.state.data;
      console.log(this.jobId);
    });
  }

  ngOnInit() {
    this.JobService.getAllEvents().subscribe((res) => {
      this.events = []
      this.events = res
      this.cRef.detectChanges()
    });
  }
}
