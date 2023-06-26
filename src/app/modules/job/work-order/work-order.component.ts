import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.css']
})
export class WorkOrderComponent {
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe(params => {
      const jobId =  params.get('id');
      console.log(jobId)
    });
  }
}
