import { Component, OnInit, ViewChild } from '@angular/core';
import { MisAdelantosSolicitadosService } from './mis-adelantos-solicitados.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalMisAdelantosSolicitados } from './modal-mis-adelantos-solicitados/modal-mis-adelantos-solicitados.component';
import { ModalMisAdelantosSolicitadosDetallesComponent } from './modal-mis-adelantos-solicitados-detalles/modal-mis-adelantos-solicitados-detalles.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-adelantos-solicitados',
  templateUrl: './mis-adelantos-solicitados.component.html',
  providers: [MisAdelantosSolicitadosService, ModalMisAdelantosSolicitadosDetallesComponent, ModalMisAdelantosSolicitados, SpinnerCargaComponent],
  styleUrls: ['./mis-adelantos-solicitados.component.scss']
})
export class MisAdelantosSolicitadosComponent implements OnInit {

  constructor(private service: MisAdelantosSolicitadosService,
    public dialog: MatDialog,
    public spinner: SpinnerCargaComponent) { }

  insertar;
  AdelantosCargados;
  columnas = ['nro_vale', 'fecha_emision1', 'concepto', 'monto_pagado', 'cuotas', 'cuotas_pagas', 'monto_a_pagar', 'estado', 'fecha_baja', 'ver', 'editar', 'anular'];
  dataSource;
  legajo_id = sessionStorage.getItem('legajo_id');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.traerMisAdelantos();
  }

  abrirModalInsertar() {
    const dialogRef = this.dialog.open(ModalMisAdelantosSolicitados, {
      panelClass: "app-full-bleed-dialog",
      width: '1100px',
      height: '450px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: true },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerMisAdelantos(); });
  }

  abrirModalEditar(idEditar, nroAdelanto) {
    this.insertar = true;
    const dialogRef = this.dialog.open(ModalMisAdelantosSolicitados, {
      panelClass: "app-full-bleed-dialog",
      width: '1100px',
      height: '450px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: false, idEditar: idEditar, nroAdelanto: nroAdelanto },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerMisAdelantos(); });
  }

  abrirModalDetalles(idVale, nroAdelanto) {
    const dialogRef = this.dialog.open(ModalMisAdelantosSolicitadosDetallesComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '600px',
      direction: 'ltr',
      autoFocus: false,
      data: { idVale: idVale, nroAdelanto: nroAdelanto },
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

  deleteAdelanto(idEliminar, numeroAdelanto) {
    var userBaja = 'admin';
    this.service.deleteAdelanto(idEliminar, userBaja).subscribe(datos => {
      if (datos[0].eliminar_adelanto == null) {
        Swal.fire({
          title: '¡Se ha eliminado la solicitud de adelanto número ' + numeroAdelanto + '!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.traerMisAdelantos();
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al intentar eliminar la solicitud de adelanto!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  modalBorrar(idEliminar, numeroAdelanto) {
    Swal.fire({
      title: '¿Está seguro que desea dar de baja la solicitud de adelanto con número ' + numeroAdelanto + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdelanto(idEliminar, numeroAdelanto);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
