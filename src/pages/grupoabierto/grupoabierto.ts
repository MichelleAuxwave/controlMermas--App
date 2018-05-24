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

  mermas: any[] = [];
  merm = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner, private storage: Storage,
    private databaseProvider : DatabaseProvider, public toastCtrl: ToastController) { }

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

  ionViewDidLoad(){
    this.obtenerTodasLasMermas();
  }

  obtenerTodasLasMermas(){
    this.databaseProvider.obtenerTodasLasMermas()
    .then(merma => {
      console.log(merma);
      this.mermas = merma;
    })
    .catch( error => {
      console.error( error );
      let toast = this.toastCtrl.create({
        message: error,
        duration: 6000
      });
      toast.present();
    });
  }

  agregarUnaMerma(){
    this.databaseProvider.agregarMerma(this.noOrdenLeida, 'G', this.merm['obs'])
    .then(merma => {
      console.log(merma);
      this.mermas = merma;
    })
    .catch( error => {
      console.error( error );
      let toast = this.toastCtrl.create({
        message: error,
        duration: 6000
      });
      toast.present();
    });
  }

}
