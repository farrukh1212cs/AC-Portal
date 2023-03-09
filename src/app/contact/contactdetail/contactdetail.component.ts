import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.css']
})
export class ContactdetailComponent {
  contact: any;

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      const contactId =  params.get('id');
      this.contact = history.state.model;
      console.log(this.contact);
    });
  }


 
}
