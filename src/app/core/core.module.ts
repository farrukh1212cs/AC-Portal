import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AcinterceptorService } from './rootservices/acinterceptor.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CsvExportService } from './rootservices/csv-export-service.service';
import { ColorSliderComponent } from './color-slider/color-slider.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SideBarComponent,
    FooterComponent,
    ColorSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule
  ],
  exports : [
    NavBarComponent,
    SideBarComponent,
    FooterComponent,
    ColorSliderComponent
  ],
  providers: [CsvExportService,{ provide: HTTP_INTERCEPTORS, useClass: AcinterceptorService, multi: true }],
})
export class CoreModule { }
