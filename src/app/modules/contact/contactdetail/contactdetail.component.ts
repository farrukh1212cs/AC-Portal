import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RelatedContactDetailsComponent } from '../related-contact-details/related-contact-details.component';
import { ContactService } from 'src/app/core/services/contact.service';

@Component({
  selector: 'app-contactdetail',
  templateUrl: './contactdetail.component.html',
  styleUrls: ['./contactdetail.component.css']
})
export class ContactdetailComponent {
  contact: any;

  constructor(private route: ActivatedRoute, private dialog: MatDialog,public contactService: ContactService,) {
    this.route.paramMap.subscribe(params => {
      const contactId =  params.get('id');
      this.contact = history.state.model;
      this.contact.startDate = new Date(this.contact?.startDate)
      console.log(this.contact)
    });
  }

  openRelatedContactModal(data:any): void {
    let dialogRef: any = {};
    dialogRef = this.dialog.open(RelatedContactDetailsComponent, {
      width: '50vw',
      height: '50vh',
      data: data,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      
    });
  }


}
