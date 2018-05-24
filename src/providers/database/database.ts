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

  limpiatTodaLaTablaMermas(){
    let sql = 'DELETE FROM mermas';
    return this.db.executeSql(sql, []);
  }

  crearTablaMermas(){
    let sql = 'DROP TABLE IF EXISTS mermas; CREATE TABLE mermas(ide INTEGER AUTOINCREMENT, ord INTEGER, tip NVARCHAR, obs NVARCHAR)';
    return this.db.executeSql(sql, []);
  }

  obtenerTodasLasMermas(){
    let sql = 'SELECT * FROM mermas';
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
    let sql = 'INSERT INTO mermas(ord, tip, obs) VALUES(?,?,?)';
    return this.db.executeSql(sql, [ord, tip, obs]);
  }

}
