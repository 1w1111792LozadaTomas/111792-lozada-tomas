import { Component, OnInit, ViewChild } from '@angular/core';
import { MisLicenciasSolicitadasService } from './mis-licencias-solicitadas.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalMisLicenciasSolicitadasComponent } from './modal-mis-licencias-solicitadas/modal-mis-licencias-solicitadas.component';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-licencias-solicitadas',
  templateUrl: './mis-licencias-solicitadas.component.html',
  providers: [MisLicenciasSolicitadasService, SpinnerCargaComponent],
  styleUrls: ['./mis-licencias-solicitadas.component.scss']
})
export class MisLicenciasSolicitadasComponent implements OnInit {
  insertar;
  spinnerCarga;
  LicenciasCargadas;
  columnas = ['licencia_id', 'nombre_licencia', 'anio', 'inicio1', 'fin1', 'detalles', 'estado', 'fecha_baja', 'ver', 'editar', 'anular'];
  dataSource;
  term:any;
  legajo_id = sessionStorage.getItem('legajo_id');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: MisLicenciasSolicitadasService,
    public dialog: MatDialog,
    public spinner: SpinnerCargaComponent) { }

  ngOnInit(): void {
    this.traerMisLicencias();
  }

  abrirModalInsertar() {
    const dialogRef = this.dialog.open(ModalMisLicenciasSolicitadasComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '560px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: true },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerMisLicencias(); });
  }

  abrirModalEditar(idEditar, soloLectura) {
    const dialogRef = this.dialog.open(ModalMisLicenciasSolicitadasComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '560px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: false, idEditar: idEditar, soloLectura: soloLectura },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerMisLicencias(); });
  }

  traerMisLicencias() {
    this.spinner.cargarSpinner();
    this.service.getLicenciasSolicitadas(this.legajo_id!).subscribe(datos => {
      this.LicenciasCargadas = false;
      const LicenciasListado: any[] = [];
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

  deleteLicencia(idEliminar) {
    var userBaja = 'admin';
    this.service.deleteLicencia(idEliminar, userBaja).subscribe(datos => {
      if (datos[0].eliminar_licencia == null) {
        Swal.fire({
          title: '¡Se ha eliminado la solicitud de licencia número ' + idEliminar + '!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.traerMisLicencias();
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al intentar eliminar la solicitud de licencia!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  modalBorrar(idEliminar) {
    Swal.fire({
      title: '¿Está seguro que desea dar de baja la solicitud de licencia con número ' + idEliminar + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteLicencia(idEliminar);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

