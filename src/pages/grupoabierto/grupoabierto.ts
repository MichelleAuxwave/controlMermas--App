import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-grupoabierto',
  templateUrl: 'grupoabierto.html',
})

export class GrupoabiertoPage {
  radioColor: string = 'dark';
  noOrdenLeida: any;
  datosGuardados:any[] = [];

  merm = {};
  private ListaMermas : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner, private storage: Storage,
    private database : DatabaseProvider, public toastCtrl: ToastController) {
    this.consultarMermas();
  }

  cambiarRadioColor(){
    this.radioColor = 'shamir1';
  }

  scanBC(){
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled == true){
        this.guardarScan( barcodeData.text );
      }
    }).catch(err => {
        console.log('Error', err);
    });
  }

  guardarScan( valor:string ){
      this.storage.set('ordenEscaneada', valor);
      this.storage.get('ordenEscaneada').then((val) => {
      this.noOrdenLeida = val;
    });
  }

  agregarMerma(){
    this.database.guardarOrden(parseInt(this.merm['ord']), this.merm['tip'], this.merm['obs']).then(
      (data) => { console.log(data); this.consultarMermas(); },
      (error) => {
        let eee = this.toastCtrl.create({
          message: "D: " + error,
          duration: 5000
        });
        eee.present();
    });
    this.merm = {};
  }

  consultarMermas(){
    this.database.mostrarOrdenesGuardadas().then(
      (data) => { this.ListaMermas = data; },
      (error) => {
        let eee = this.toastCtrl.create({
          message: "E: " + error,
          duration: 5000
        });
        eee.present();
    });
  }

}
