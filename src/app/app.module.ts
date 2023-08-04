import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://essapp.in', options: {} };
//const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    SocketIoModule.forRoot(config), 
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      driverOrder: [Drivers.SecureStorage, Drivers.IndexedDB, Drivers.LocalStorage]
    }), 
      IonicModule.forRoot({
      backButtonText: '' // Set an empty string to have no text next to the back icon
    }),
    AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
