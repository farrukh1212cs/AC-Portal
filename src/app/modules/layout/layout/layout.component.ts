import { Component, OnInit, AfterViewInit, ElementRef, ViewChild , HostListener} from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public getScreenWidth: any;
  @ViewChild('layout')
  layout!: ElementRef;

  ngAfterViewInit (){
    this.getScreenWidth = window.innerWidth
    if(this.getScreenWidth > 992){
      this.layout.nativeElement.classList.add("sidebar-slim")
    }
    // if(this.getScreenWidth > 600 && this.getScreenWidth < 992){
    //   this.layout.nativeElement.classList.add("tablet","sidebar-slim")
    // }
    if(this.getScreenWidth < 600){
      this.layout.nativeElement.classList.add("sidebar-overlay" )
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.getScreenWidth = event.target.innerWidth;
    // if(this.getScreenWidth > 992){
    //   this.layout.nativeElement.classList.remove("mobile", "tablet", "sidebar-slim", "sidebar-mobile")
    //   this.layout.nativeElement.classList.add("desktop")
    // }
    if(this.getScreenWidth > 600 && this.getScreenWidth < 1201){
      this.layout.nativeElement.classList.remove("sidebar-expanded")
      this.layout.nativeElement.classList.add("sidebar-slim")
    }
    if(this.getScreenWidth < 600){
      this.layout.nativeElement.classList.remove("sidebar-expanded","sidebar-slim")
      this.layout.nativeElement.classList.add("sidebar-overlay" )
    }
  }


  toggleSidebar(elem:HTMLElement) {
    this.getScreenWidth = window.innerWidth
    if(this.getScreenWidth > 992){
      elem.classList.toggle("sidebar-slim")
      elem.classList.toggle("sidebar-expanded")
      // if(elem.classList.contains("sidebar-slim")){
      //   elem.classList.toggle("sidebar-slim")
      //   elem.classList.toggle("sidebar-expanded")
      // }
    }
    // if(this.getScreenWidth > 600 && this.getScreenWidth < 992 ){
    //   if(elem.classList.contains("tablet")){
    //     elem.classList.toggle("sidebar-slim")
    //   }
    // }
    if(this.getScreenWidth < 600 ){
      elem.classList.toggle("sidebar-overlay-open")
      // if(elem.classList.contains("mobile")){
      
      // }
    }
  }
}
