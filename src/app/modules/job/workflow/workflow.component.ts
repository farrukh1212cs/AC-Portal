import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-workflow',
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css']
})
export class WorkflowComponent {
  jobId: any;
  workFlows: any;

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
    this.JobService.getAllWorkFlows().subscribe((res) => {
      this.workFlows = []
      this.workFlows = res.payload
      this.cRef.detectChanges()
    });
  }
}
