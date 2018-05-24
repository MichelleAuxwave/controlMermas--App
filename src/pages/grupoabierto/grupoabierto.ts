import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { isNumber } from 'ionic-angular/util/util';

@IonicPage()
@Component({
  selector: 'page-grupoabierto',
  templateUrl: 'grupoabierto.html',
})

export class GrupoabiertoPage {
  radioColor: string = 'dark';
  noOrdenLeida: any = null;
  motivoDeMerma: string = null;
  observacion: string;

  mermas: any[] = [];
  merm = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner, private storage: Storage,
    private databaseProvider : DatabaseProvider, public toastCtrl: ToastController,
    public alertCtrl: AlertController) { }

  seleccionarMotivoDeMerma(tipo:string){
    this.radioColor = 'shamir1';
    this.motivoDeMerma = tipo;
  }

  scanBC(){
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled == true){
        if(barcodeData.text.length > 5){
          let alert = this.alertCtrl.create({
            title: 'Ups!',
            subTitle: 'Estas escaneando un codigo de barras que no nos pertenece!',
            buttons: ['OK']
          });
          alert.present();
          this.noOrdenLeida = null;
        }
        else{
          this.noOrdenLeida = barcodeData.text;
        }
      }
    }).catch(error => {
      console.error( error );
      let toast = this.toastCtrl.create({
        message: error,
        duration: 6000
      });
      toast.present();
    });
  }

  ionViewDidLoad(){
    //this.obtenerTodasLasMermas();
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
    var mensaje = null;
    if(this.noOrdenLeida != null){
      if(this.motivoDeMerma != null){
        if(this.observacion == null || this.observacion == "" ){
          mensaje = "- No hay observaciónes - ";
        }
        else{
          mensaje = this.observacion;
        }

        this.databaseProvider.agregarMerma(this.noOrdenLeida, this.motivoDeMerma, mensaje)
        .then(merma => {
          this.mermas = merma;
          this.noOrdenLeida = null;
          this.motivoDeMerma = null;
          this.observacion = null;
          this.obtenerTodasLasMermas();
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
      else{
        let alert = this.alertCtrl.create({
          title: 'Ups!',
          subTitle: 'Parece que aun no has seleccionado un tipo de merma!',
          buttons: ['OK']
        });
        alert.present()
      }
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Ups!',
        subTitle: 'Parece que aun no has escaneado alguna orden!',
        buttons: ['OK']
      });
      alert.present()
    }
  }

}
