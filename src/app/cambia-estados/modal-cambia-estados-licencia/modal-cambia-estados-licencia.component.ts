import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MisLicenciasSolicitadasService } from './../../mis-licencias-solicitadas/modal-mis-licencias-solicitadas/modal-mis-licencias-solicitadas.service';
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
  selector: 'app-modal-cambia-estados-licencia',
  templateUrl: './modal-cambia-estados-licencia.component.html',
  providers: [MisLicenciasSolicitadasService, SpinnerCargaComponent, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  styleUrls: ['./modal-cambia-estados-licencia.component.scss']
})

export class ModalCambiaEstadosLicenciaComponent implements OnInit {

  insertar;
  idEditar;
  titulo;
  botonDesactivado;
  nombreBoton;
  soloLectura;
  estadoSeleccionadoLicencia;
  estadosLicencia;
  legajo_id = sessionStorage.getItem('legajo_id');
  legajo_id_num = parseInt(this.legajo_id!);

  constructor(public dialogRef: MatDialogRef<ModalCambiaEstadosLicenciaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: MisLicenciasSolicitadasService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.insertar, data.idEditar, data.soloLectura)
  }

  ngOnInit(): void {
    this.botonDesactivado = false;
    this.estadosLicencia = [{ id: 1, nombre: 'APROBADA' }, { id: 2, nombre: 'RECHAZADA' }];
  }

  datos(insertar: boolean, idEditar: any, soloLectura: any): void {
    if (soloLectura)
      this.titulo = 'Ver Solicitud de Licencia Número: ' + idEditar;
    else {
      insertar ? this.titulo = 'Nueva Solicitud de Licencia' : this.titulo = 'Editar Solicitud de Licencia Número: ' + idEditar;
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

  cambiaEstadoLicencia() {
    this.cargando();
    this.service.SetCambiaEstadoLicencia(this.idEditar, this.estadoSeleccionadoLicencia, this.legajo_id_num!).subscribe(datos => {
      if (datos[0].cambia_estado_licencia == null) {
        Swal.fire({
          title: '¡Se modificó la solicitud de licencia existente!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.dialogRef.close();
      }
      else
        Swal.fire({
          title: '¡Ocurrió un error al modificar la solicitud de licencia existente!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      this.terminaCarga();
    });
  }
}
