import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NuevogrupoPage, GrupoabiertoPage } from "../pages.index";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nuevoGrupo:any = NuevogrupoPage;
  grupoAbierto:any = GrupoabiertoPage;

  constructor(public navCtrl: NavController) {

  }
}
