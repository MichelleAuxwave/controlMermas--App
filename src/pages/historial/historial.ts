import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  mermas: any[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public databaseProvider : DatabaseProvider, 
    public toastCtrl : ToastController) 
    {  }

  ionViewDidLoad() {
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

}
