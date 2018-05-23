import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

@Injectable()
export class DatabaseProvider {
  private db : SQLiteObject;
  private isOpen : boolean;

  constructor(public http: Http, public storage: SQLite, public toastCtrl: ToastController) {
    this.abrirDB();
  }

  abrirDB(){
    if(!this.isOpen){
      this.storage = new SQLite();
      this.storage.create({name: "data.db", location: "default"}).then((db:SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS mermasguardadas(ord int primary key, tip nvarchar, obs nvarchar);", {});
        db.executeSql("INSERT INTO mermasguardadas VALUES(1234, 'G', 'MERMA DE EJEMPLO');", []);
        this.isOpen = true;
      }).catch((error) => {
        let eee = this.toastCtrl.create({
          message: "A: " + error,
          duration: 5000
        });
        eee.present();
      })
    }
  }

  guardarOrden(ord: number, tip: string, obs: string){
      return new Promise((resolve, reject) =>{
        let sql = "insert into mermasguardadas (ord, tip, obs) values (?, ?, ?)";
        this.db.executeSql(sql, [ord, tip, obs]).then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
          let eee = this.toastCtrl.create({
            message: "B: " + error,
            duration: 5000
          });
          eee.present();
        });
      })
      .catch((error)=>{
        let eee = this.toastCtrl.create({
          message: error,
          duration: 5000
        });
        eee.present();
      });
  }

  mostrarOrdenesGuardadas(){
      return new Promise ((resolve, reject) => {
        this.db.executeSql("select * from mermasguardadas", []).then((data) => {
          let arrayOrdenes = [];
          if(data.rows.lenght > 0){
            for(var i = 0; i < data.rows.lenght; i++){
               arrayOrdenes.push({
                ord: data.rows.item(i).ord,
                tip: data.rows.item(i).tip,
                obs: data.rows.item(i).obs
              });
            }
          }
          resolve(arrayOrdenes);
        }, (error) =>{
          reject(error);
          let eee = this.toastCtrl.create({
            message: "C: " + error,
            duration: 5000
          });
          eee.present();
        })
        .catch((error)=>{
          let eee = this.toastCtrl.create({
            message: error,
            duration: 5000
          });
          eee.present();
        });
      });
  }

}
