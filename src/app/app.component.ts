import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/pages.index';

import { SQLite } from '@ionic-native/sqlite';

import { DatabaseProvider } from '../providers/database/database';
import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public sqlite: SQLite, public databaseProvider: DatabaseProvider, public toastCtrl: ToastController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.createDatabase();
    });
  }

  private createDatabase(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      console.log(db);
      this.databaseProvider.setDatabase(db);
      return this.databaseProvider.crearTablaMermas();
    })
    .then(() =>{
      this.rootPage = 'TabsPage';
    })
    .catch(error =>{
      console.error(error);
      let toast = this.toastCtrl.create({
        message: error,
        duration: 6000
      });
      toast.present();
    });
  }
}
