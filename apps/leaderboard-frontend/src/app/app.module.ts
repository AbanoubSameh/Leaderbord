import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiModule } from '@shared/ui';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { AppRoutingModule } from './app-routing.module';
import { SharedDataAccessModule } from "@shared/data-access";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgHttpLoaderModule.forRoot(),
    SharedUiModule,
    NoopAnimationsModule,
    HotToastModule.forRoot(),
    SharedDataAccessModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
