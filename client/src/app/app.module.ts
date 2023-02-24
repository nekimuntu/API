import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HttpClientModule} from '@angular/common/http'  ///////SECTION 8 injecting services when Angular load
import { CoreModule } from './core/core.module';
import { ShopComponent } from './shop/shop.component';
import { ShopModule } from './shop/shop.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,  ///////SECTION 8 injecting services when Angular load
    CoreModule,
    HomeModule ////Section 10 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
