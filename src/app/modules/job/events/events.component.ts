import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent {

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.route.paramMap.subscribe(params => {
      const jobId =  params.get('id');
      console.log(jobId)
    });
  }
}
