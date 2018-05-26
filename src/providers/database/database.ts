import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController } from 'ionic-angular';

@Injectable()
export class DatabaseProvider {

  db: SQLiteObject = null;
  constructor() {}

  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }

  eliminarTablaMermas(){
    let sql = 'DROP TABLE IF EXISTS mermas';
    return this.db.executeSql(sql, []);
  }

  crearTablaMermas(){
    let sql = 'CREATE TABLE IF NOT EXISTS mermas(gru TEXT, ord INTEGER UNIQUE, tip TEXT, obs TEXT, dat1 TEXT)';
    return this.db.executeSql(sql, []).then((data) => {
      if(data.length == 0){

      }
    }).catch(() => {
      
    });
  }

  obtenerTodasLasMermas(){
    let sql = 'SELECT * FROM mermas ORDER BY dat1 DESC';
    return this.db.executeSql(sql, [])
    .then(response => {
      let mermasArray = [];
      for (let index = 0; index < response.rows.length; index++) {
        mermasArray.push( response.rows.item(index) );
      }
      return Promise.resolve( mermasArray );
    })
    .catch(error => Promise.reject(error));
  }

  agregarMerma(ord: number, tip: string, obs: string){
    let sql = "INSERT INTO mermas(gru, ord, tip, obs, dat1) VALUES('123456789-A',?,?,?, datetime('now'))";
    return this.db.executeSql(sql, [ord, tip, obs]);
  }

  comprobarNoRedundancia(ord: number){
    let sql = "SELECT ord FROM mermas WHERE ord =?";
    return this.db.executeSql(sql, [ord])
    .then(response => {
      let res = null;
      if (response.rows.length > 0) { res = 'y' }
      else{ res = 'n' }
      return Promise.resolve( res );
    })
    .catch(error => Promise.reject(error));
  }

}
