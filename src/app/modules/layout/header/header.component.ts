import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toogleSidebaremit = new EventEmitter<string>();
  constructor() { }


  toggleSidebar(){
    this.toogleSidebaremit.emit();
  }
}
