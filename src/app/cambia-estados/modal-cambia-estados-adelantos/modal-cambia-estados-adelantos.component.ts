import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalMisAdelantosSolicitadosService } from './../../mis-adelantos-solicitados/modal-mis-adelantos-solicitados/modal-mis-adelantos-solicitados.service';
import Swal from 'sweetalert2'
import { SpinnerCargaComponent } from '../../utilidades/spinner-carga/spinner-carga.component'
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

declare var require: any;
var $ = require('jquery');

export interface DialogData {
  insertar: boolean;
  idEditar: any;
  soloLectura: any;
}

@Component({
  selector: 'app-modal-cambia-estados-adelantos',
  templateUrl: './modal-cambia-estados-adelantos.component.html',
  providers: [ModalMisAdelantosSolicitadosService, SpinnerCargaComponent, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  styleUrls: ['./modal-cambia-estados-adelantos.component.scss']
})

export class ModalCambiaEstadosAdelantosComponent implements OnInit {

  insertar;
  idEditar;
  titulo;
  botonDesactivado;
  nombreBoton;
  soloLectura;
  estadoSeleccionadoAdelanto;
  estadosAdelanto;
  legajo_id = sessionStorage.getItem('legajo_id');
  legajo_id_num = parseInt(this.legajo_id!);

  constructor(public dialogRef: MatDialogRef<ModalCambiaEstadosAdelantosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ModalMisAdelantosSolicitadosService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.insertar, data.idEditar, data.soloLectura)
  }

  ngOnInit(): void {
    this.botonDesactivado = false;
    this.estadosAdelanto = [{ id: 1, nombre: 'APROBADO' }, { id: 2, nombre: 'RECHAZADO' }, { id: 3, nombre: 'PAGADO' }];
  }

  datos(insertar: boolean, idEditar: any, soloLectura: any): void {
    if (soloLectura)
      this.titulo = 'Ver Solicitud de Adelanto Número: ' + idEditar;
    else {
      insertar ? this.titulo = 'Nueva Solicitud de Adelanto' : this.titulo = 'Editar Solicitud de Adelanto Número: ' + idEditar;
      insertar ? this.nombreBoton = 'Agregar' : this.nombreBoton = 'Guardar Cambios';
    }
    this.insertar = insertar;
    this.idEditar = idEditar;
    this.soloLectura = soloLectura;
  }

  cargando() {
    this.botonDesactivado = true;
    this.spinner.cargarSpinner();
  }

  terminaCarga() {
    this.botonDesactivado = false;
    this.spinner.sacarSpinner();
  }

  cambiaEstadoAdelanto() {
    this.cargando();
    this.service.SetCambiaEstadoAdelanto(this.idEditar, this.estadoSeleccionadoAdelanto, this.legajo_id_num!).subscribe(datos => {
      if (datos[0].cambia_estado_adelanto == null) {
        this.dialogRef.close();
        Swal.fire({
          title: '¡Se modificó la solicitud de adelanto existente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
      else
        Swal.fire({
          title: '¡Ocurrió un error al modificar la solicitud de adelanto existente!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      this.terminaCarga();
    });
  }
}
