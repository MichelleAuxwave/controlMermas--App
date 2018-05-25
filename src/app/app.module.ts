import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

/* PLUGINS */
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { HttpModule } from '@angular/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';

/* PAGINAS */
import {
  HomePage,
  TabsPage,
  HistorialPage,
  NuevogrupoPage,
  GrupoabiertoPage,
} from '../pages/pages.index';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    HistorialPage,
    NuevogrupoPage,
    GrupoabiertoPage,

  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    HistorialPage,
    NuevogrupoPage,
    GrupoabiertoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLitePorter,
    SQLite,
    IonicStorageModule,
    HttpModule,
    DatabaseProvider
  ]
})
export class AppModule {}
