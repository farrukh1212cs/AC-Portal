import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcinterceptorService } from './rootservices/acinterceptor.service';



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    FooterComponent

  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports : [
    NavBarComponent,
    SideBarComponent,
    FooterComponent
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AcinterceptorService, multi: true }],
})
export class CoreModule { }
