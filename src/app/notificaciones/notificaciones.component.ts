import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacionesService } from './notificaciones.service';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  providers: [NotificacionesService, SpinnerCargaComponent],
  styleUrls: ['./notificaciones.component.scss']
})
export class NotificacionesComponent implements OnInit {
  insertar;
  spinnerCarga;
  NotificacionesCargadas;
  columnas = ['fecha_ing','tipo_notificacion','mensaje'];
  dataSource;
  legajo_id = sessionStorage.getItem('legajo_id');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: NotificacionesService,
    public dialog: MatDialog,
    public spinner: SpinnerCargaComponent) { }

  ngOnInit(): void {
    this.traerMisNotificaciones();
  }

  traerMisNotificaciones() {
    this.spinner.cargarSpinner();
    this.service.GetBuscarMisNotificaciones(this.legajo_id!).subscribe(datos => {
      this.NotificacionesCargadas = false;
      const LicenciasListado: any[] = [];
      if (datos.length == 0) {
        Swal.fire({
          title: '¡No hay notificaciones recibidas!',
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
        this.NotificacionesCargadas = true;
      }
      this.spinner.sacarSpinner();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

