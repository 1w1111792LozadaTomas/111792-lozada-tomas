import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPreguntasComponent } from './modal-preguntas/modal-preguntas.component';

@Component({
  selector: 'app-terminos-ycondiciones',
  templateUrl: './terminos-ycondiciones.component.html',
  styleUrls: ['./terminos-ycondiciones.component.scss']
})
export class TerminosYCondicionesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirModalPreguntas() {
    const dialogRef = this.dialog.open(ModalPreguntasComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '560px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: true },
    });
  }
}
