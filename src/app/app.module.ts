import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountModule } from './account/account.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ToastrModule } from 'ngx-toastr';
import { ContactModule } from './modules/contact/contact.module';
import { CoreModule } from './core/core.module';
import * as Papa from 'papaparse';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationComponent
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AccountModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{ provide: 'Papa', useValue: Papa }],
  bootstrap: [AppComponent]
})
export class AppModule { }
