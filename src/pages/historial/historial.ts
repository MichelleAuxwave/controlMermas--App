import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DetallehistorialPage } from '../pages.index';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  detalleHistorial : any = DetallehistorialPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistorialPage');
  }

}
