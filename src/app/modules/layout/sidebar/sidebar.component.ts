import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  sidebarexpandedicon: boolean = false;
  @Output() toogleSidebaremit = new EventEmitter<string>();
  
  toggleSidebar(){
    this.toogleSidebaremit.emit();
    this.sidebarexpandedicon = !this.sidebarexpandedicon;
  }

}
