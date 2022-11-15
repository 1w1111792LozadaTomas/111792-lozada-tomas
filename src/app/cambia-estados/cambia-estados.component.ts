import { Component, OnInit, ViewChild } from '@angular/core';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { CambiaEstadosService } from './cambia-estados.service';
import { ModalCambiaEstadosLicenciaComponent } from '../cambia-estados/modal-cambia-estados-licencia/modal-cambia-estados-licencia.component';
import { ModalCambiaEstadosAdelantosComponent } from '../cambia-estados/modal-cambia-estados-adelantos/modal-cambia-estados-adelantos.component';

@Component({
  selector: 'app-cambia-estados',
  templateUrl: './cambia-estados.component.html',
  providers: [CambiaEstadosService, SpinnerCargaComponent],
  styleUrls: ['./cambia-estados.component.scss']
})
export class CambiaEstadosComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  columnas1 = ['licencia_id', 'nombre_licencia', 'anio', 'inicio1', 'fin1', 'detalles', 'estado', 'fecha_baja', 'cambia-estado'];
  columnas2 = ['nro_vale', 'fecha_emision1', 'concepto', 'monto_pagado', 'cuotas', 'cuotas_pagas', 'monto_a_pagar', 'estado', 'fecha_baja', 'cambia-estado'];
  legajo_id = sessionStorage.getItem('legajo_id');
  LicenciasCargadas;
  AdelantosCargados;
  dataSource;
  modulosList;
  moduloSeleccionado;

  constructor(private service: CambiaEstadosService,
    public dialog: MatDialog,
    public spinner: SpinnerCargaComponent) { }

  ngOnInit(): void {
    this.moduloSeleccionado = 0;
    this.modulosList = [{ id: 1, nombre: 'Licencias' }, { id: 2, nombre: 'Adelantos' }];
    this.LicenciasCargadas = false;
    this.AdelantosCargados = false;
  }

  traerMisLicencias() {
    this.spinner.cargarSpinner();
    this.service.getLicenciasSolicitadas(this.legajo_id!).subscribe(datos => {
      this.LicenciasCargadas = false;
      if (datos.length == 0) {
        Swal.fire({
          title: '¡No hay licencias solicitadas!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        this.dataSource = new MatTableDataSource(datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.LicenciasCargadas = true;
      }
      this.spinner.sacarSpinner();
    });
  }

  traerMisAdelantos() {
    this.spinner.cargarSpinner();
    this.AdelantosCargados = false;
    this.service.getAdelantosSolicitados(this.legajo_id!).subscribe(datos => {
      if (datos.length == 0) {
        Swal.fire({
          title: '¡No hay adelantos solicitados!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        this.dataSource = new MatTableDataSource(datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.AdelantosCargados = true;
      }
      this.spinner.sacarSpinner();
    });
  }

  abreModalLicencias(idEditar, soloLectura) {
    const dialogRef = this.dialog.open(ModalCambiaEstadosLicenciaComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '800px',
      height: '400px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: false, idEditar: idEditar, soloLectura: soloLectura },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerMisLicencias(); });
  }

  abreModalAdelantos(idEditar, soloLectura) {
    const dialogRef = this.dialog.open(ModalCambiaEstadosAdelantosComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '800px',
      height: '400px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: false, idEditar: idEditar, soloLectura: soloLectura },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerMisAdelantos(); });
  }

  onChangeCombo() {
    if (this.moduloSeleccionado == 1) {
      this.traerMisLicencias();
    }
    else
      if (this.moduloSeleccionado == 2) {
        this.traerMisAdelantos();
      }
  }
}
