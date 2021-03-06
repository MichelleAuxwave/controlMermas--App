import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, RadioButton } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Storage } from '@ionic/storage';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HistorialPage } from '../pages.index'
import * as $ from 'jquery'

@IonicPage()
@Component({
  selector: 'page-grupoabierto',
  templateUrl: 'grupoabierto.html',
})

export class GrupoabiertoPage {
  radioColor: string = 'dark';
  noOrdenLeida: any = null;
  motivoDeMerma: string = null;
  txtObservacion: string;
  historial:any = HistorialPage;

  tipoDeMerma: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private barcodeScanner: BarcodeScanner, private storage: Storage,
    private databaseProvider : DatabaseProvider, public toastCtrl: ToastController,
    public alertCtrl: AlertController) 
    {
      $("#rBtn1, #rBtn2, #rBtn3").prop('checked', false);
    }

    seleccionarMotivoDeMerma(tipo:string){
      this.radioColor = 'shamir1';
      this.motivoDeMerma = tipo;
    }

  scanBC(){
    this.barcodeScanner.scan().then(barcodeData => {
      if(!barcodeData.cancelled == true){
        if(barcodeData.text.length > 12){
          let alert = this.alertCtrl.create({
            title: 'Ups!',
            subTitle: 'Estas escaneando un codigo de barras que no nos pertenece!',
            buttons: ['OK']
          });
          alert.present();
          this.noOrdenLeida = null;
        }
        else{
          this.databaseProvider.comprobarNoRedundancia(parseInt(this.noOrdenLeida)).then((data) => {
            if(data === 'y'){
              let alert = this.alertCtrl.create({
                title: 'Ups!',
                subTitle: 'La orden que escaneaste ya existe!',
                buttons: ['OK']
              });
              alert.present();
              this.noOrdenLeida = null;
            }
            if(data === 'n'){
              this.noOrdenLeida = barcodeData.text;
              $("#rBtn1, #rBtn2, #rBtn3").prop('checked', false);
            }
          }).catch((error) => {
            console.error( error );
            let toast = this.toastCtrl.create({
              message: error,
              duration: 6000
            });
            toast.present();
          });
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

  agregarUnaMerma(){
    var mensaje = null;
    if(this.noOrdenLeida != null){
      if(this.motivoDeMerma != null){
        if(this.txtObservacion == null || this.txtObservacion == "" ){
          mensaje = "- No hay observaciónes - ";
        }
        else{
          mensaje = this.txtObservacion;
        }

        this.databaseProvider.agregarMerma(parseInt(this.noOrdenLeida), this.motivoDeMerma, mensaje)
        .then(merma => {
          this.historial.mermas = merma;
          this.noOrdenLeida = null;
          this.motivoDeMerma = null;
          this.txtObservacion = null;

          $("#rBtn1, #rBtn2, #rBtn3").prop('checked', false);

          let alert = this.alertCtrl.create({
            title: 'Guardado!',
            subTitle: 'Orden registrada correctamente!',
            buttons: ['OK']
          });
          alert.present()
        })
        .catch( error => {
          this.noOrdenLeida = null;
          this.motivoDeMerma = null;
          this.txtObservacion = null;

          $("#rBtn1, #rBtn2, #rBtn3").prop('checked', false);

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
      $("#rBtn1, #rBtn2, #rBtn3").prop('checked', false);
      let alert = this.alertCtrl.create({
        title: 'Ups!',
        subTitle: 'Parece que aun no has escaneado alguna orden!',
        buttons: ['OK']
      });
      alert.present()
    }
  }

}
