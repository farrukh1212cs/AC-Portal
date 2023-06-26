import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financials',
  templateUrl: './financials.component.html',
  styleUrls: ['./financials.component.css']
})
export class FinancialsComponent {
  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe(params => {
      const jobId =  params.get('id');
      console.log(jobId)
    });
  }
}
