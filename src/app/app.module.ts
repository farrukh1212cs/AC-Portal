import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AccountModule } from './account/account.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactModule } from './contact/contact.module';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, ConfirmationComponent],
  imports: [
    BrowserModule,
    AccountModule,
    AppRoutingModule,
    DashboardModule,
    BrowserAnimationsModule,
    ContactModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
