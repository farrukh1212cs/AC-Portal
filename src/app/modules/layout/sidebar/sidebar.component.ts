import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() toogleSidebaremit = new EventEmitter<string>();
  
  toggleSidebar(){
    this.toogleSidebaremit.emit();
  }
}
