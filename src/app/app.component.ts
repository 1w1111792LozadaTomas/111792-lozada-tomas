import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [AppService],
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('hamburguerX', [
      /*
        state hamburguer => is the regular 3 lines style.
        states topX, hide, and bottomX => used to style the X element
      */
      state('hamburguer', style({})),
      // style top bar to create the X
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      // hides element when create the X (used in the middle bar)
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      // style bottom bar to create the X
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.2s'), // controls animation speed
      ]),
    ]),
  ]
})
export class AppComponent {
  title = 'MiLegajoTesis';
  showFiller = false;
  opened = false;
  isHamburguer = true;
  listadoNotificaciones;
  notiNoLeidas;
  legajo_id = sessionStorage.getItem('legajo_id');

  constructor(public service: AppService, private router: Router) {
    this.notiNoLeidas = 0;
    this.getNotificaciones();
  }

  onClickBurger() {
    this.isHamburguer = !this.isHamburguer;
  }

  getNotificaciones() {
    this.service.getNotificaciones(this.legajo_id!).subscribe(datos => {
      this.listadoNotificaciones = datos;
      var aux = 0;
      for (var i = 0; i < datos.length; i++) {
        if (!datos[i].leido)
          aux++;
      }
      this.notiNoLeidas = aux;
    });
  }

  SetNotificacionMarcarLeida(p_id_noti, modulo) {
    this.service.SetNotificacionMarcarLeida(p_id_noti).subscribe(datos =>
      this.getNotificaciones());
    switch (modulo) {
      case 'LICENCIAS':
        this.router.navigate(['/misLicenciasSolicitadas']);
        break;
      case 'ADELANTOS':
        this.router.navigate(['/misAdelantosSolicitados']);
        break;
      case 'MENSAJES':
        this.router.navigate(['/misMensajes']);
        break;
    }
  }

  SetNotificacionMarcarLeidaMasiva() {
    this.service.SetNotificacionMarcarLeidaMasiva(this.legajo_id!).subscribe(datos =>
      this.getNotificaciones());
  }
}

