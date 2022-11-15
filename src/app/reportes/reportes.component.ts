import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from '../../../node_modules/chart.js'
import { registerables } from 'chart.js';
import { ReportesService } from './reportes.service';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { ModalReportesComponent } from './modal-reportes/modal-reportes.component';
import { takeLast } from 'rxjs';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  providers: [ReportesService, SpinnerCargaComponent, ModalReportesComponent],
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {
  nombreGrafico;
  legajo_id = sessionStorage.getItem('legajo_id');
  aniosList;
  categoriasList;
  licenciasReportesList;
  adelantosReportesList;
  reportesList;
  anioSeleccionado;
  valorComboCat;
  valorComboRep;
  listadoAnios;
  arrayTiposLicencia: string[] = [];
  arrayCantDiasTotales: number[] = [];
  arrayCantDiasUsados: number[] = [];
  arrayCantDiasDisponibles: number[] = [];

  constructor(public spinner: SpinnerCargaComponent, public dialog: MatDialog, private service: ReportesService) { }

  ngOnInit(): void {
    this.aniosList = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    this.categoriasList = [{ id: 1, nombre: 'Licencias' }, { id: 2, nombre: 'Adelantos' }];
    this.licenciasReportesList = [{ id: 1, nombre: 'Licencias Solicitadas' }, { id: 2, nombre: 'Días Disponibles' }, { id: 3, nombre: 'Porcentaje de Aprobación' }];
    this.adelantosReportesList = [{ id: 1, nombre: 'Adelantos Solicitados' }, { id: 2, nombre: 'Porcentaje de Aprobación' }];
    Chart.register(...registerables);
  }

  recortarDecimales(x) {
    return x.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
  }

  OnChangeComboCategorias() {
    this.anioSeleccionado = null;
    this.valorComboRep = null;
    if (this.valorComboCat == 1) {
      this.reportesList = this.licenciasReportesList;
    }
    else if (this.valorComboCat == 2) {
      this.reportesList = this.adelantosReportesList;
    }
  }

  OnChangeComboReportes() {
    this.anioSeleccionado = null;
    this.listadoAnios = this.aniosList;
  }

  OnChangeComboAnio() {
    if (this.valorComboCat == 1) {
      switch (this.valorComboRep) {
        case 1:
          this.repLicenciasSolicitadas();
          break;
        case 2:
          this.repLicenciasDiasDisponiblesXAnio();
          break;
        case 3:
          this.repLicenciasAprobadas();
          break;
      }
    }
    else
      if (this.valorComboCat == 2) {
        switch (this.valorComboRep) {
          case 1:
            this.repAdelantosSolicitados();
            break;
          case 2:
            this.repAdelantosAprobados();
            break;
        }
      }
  }

  repLicenciasSolicitadas() {
    this.service.GetRepLicenciasSolcitadasXAnio(this.legajo_id!, this.anioSeleccionado).subscribe(datos => {
      var chartBar = false;
      var nombreReporte = 'Reporte Solicitudes de Licencia Para el Año ' + this.anioSeleccionado;
      if (datos.length > 0) {
        var total = datos[0].anuladas + datos[0].aprobadas + datos[0].para_aprobar + datos[0].rechazadas;
        var labels = ['Para aprobar (' + datos[0].para_aprobar + ')', 'Aprobada (' + datos[0].aprobadas + ')', 'Rechazada (' + datos[0].rechazadas + ')', 'Anulada (' + datos[0].anuladas + ')', 'Total (' + total + ')'];
        var valores = [datos[0].para_aprobar, datos[0].aprobadas, datos[0].rechazadas, datos[0].anuladas];
        var colores = ['rgb(255, 205, 86)', 'rgb(54, 162, 235)', 'rgb(255, 99, 132)', '#9E9E9E'];
        const dialogRef = this.dialog.open(ModalReportesComponent, {
          panelClass: "app-full-bleed-dialog",
          width: '800px',
          height: '650px',
          direction: 'ltr',
          autoFocus: false,
          data: { nombreReporte, labels, valores, chartBar, colores },
        });
      }
      else {
        Swal.fire({
          title: '¡No se solicitaron licencias para ese año!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  repAdelantosSolicitados() {
    this.service.GetRepAdelantosSolicitadoXAnio(this.legajo_id!, this.anioSeleccionado).subscribe(datos => {
      var chartBar = false;
      var nombreReporte = 'Reporte Solicitudes de Adelanto Para el Año ' + this.anioSeleccionado;
      if (datos.length > 0) {
        if (datos[0].anulados == 0 && datos[0].aprobados == 0 && datos[0].para_aprobar == 0 && datos[0].rechazados == 0 && datos[0].pagados == 0) {
          Swal.fire({
            title: '¡No se solicitaron Adelantos para ese año!',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          })
          return;
        }
        var total = datos[0].anulados + datos[0].aprobados + datos[0].para_aprobar + datos[0].rechazados + datos[0].pagados;
        var labels = ['Para aprobar (' + datos[0].para_aprobar + ')', 'Pagado (' + datos[0].pagados + ')', 'Aprobado (' + datos[0].aprobados + ')', 'Rechazado (' + datos[0].rechazados + ')', 'Anulado (' + datos[0].anulados + ')', 'Total (' + total + ')'];
        var valores = [datos[0].para_aprobar, datos[0].pagados, datos[0].aprobados, datos[0].rechazados, datos[0].anulados];
        var colores = ['rgb(255, 205, 86)', '#43A047', 'rgb(54, 162, 235)', 'rgb(255, 99, 132)', '#9E9E9E'];
        const dialogRef = this.dialog.open(ModalReportesComponent, {
          panelClass: "app-full-bleed-dialog",
          width: '800px',
          height: '650px',
          direction: 'ltr',
          autoFocus: false,
          data: { nombreReporte, labels, valores, chartBar, colores },
        });
      }
      else {
        Swal.fire({
          title: '¡No se solicitaron Adelantos para ese año!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  repLicenciasAprobadas() {
    this.service.GetRepLicenciasSolcitadasXAnio(this.legajo_id!, this.anioSeleccionado).subscribe(datos => {
      var chartBar = false;
      var nombreReporte = 'Reporte Porcentaje de Aprobación de Licencias Para  Año ' + this.anioSeleccionado;
      if (datos.length > 0) {
        var total = datos[0].aprobadas + datos[0].rechazadas;
        var porcentajeAprobadas = this.recortarDecimales(((datos[0].aprobadas / total) * 100));
        var procentajesRechazadas = this.recortarDecimales(((datos[0].rechazadas / total) * 100));
        var labels = ['Aprobadas (' + porcentajeAprobadas + '%)', 'Rechazadas (' + procentajesRechazadas + '%)'];
        var valores = [datos[0].aprobadas, datos[0].rechazadas];
        var colores = ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'];
        const dialogRef = this.dialog.open(ModalReportesComponent, {
          panelClass: "app-full-bleed-dialog",
          width: '800px',
          height: '650px',
          direction: 'ltr',
          autoFocus: false,
          data: { nombreReporte, labels, valores, chartBar, colores },
        });
      }
      else {
        Swal.fire({
          title: '¡No se solicitaron licencias para ese año!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  repAdelantosAprobados() {
    this.service.GetRepAdelantosSolicitadoXAnio(this.legajo_id!, this.anioSeleccionado).subscribe(datos => {
      var chartBar = false;
      var nombreReporte = 'Porcentaje de Aprobación de Adelantos Para el Año ' + this.anioSeleccionado;
      if (datos.length > 0) {
        if (datos[0].anulados == 0 && datos[0].aprobados == 0 && datos[0].para_aprobar == 0 && datos[0].rechazados == 0 && datos[0].pagados == 0) {
          Swal.fire({
            title: '¡No se solicitaron Adelantos para ese año!',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          })
          return;
        }
        var total = datos[0].aprobados + datos[0].rechazados;
        var porcentajeAprobadas = this.recortarDecimales(((datos[0].aprobados / total) * 100));
        var procentajesRechazadas = this.recortarDecimales(((datos[0].rechazados / total) * 100));
        var labels = ['Aprobados (' + porcentajeAprobadas + '%)', 'Rechazados (' + procentajesRechazadas + '%)'];
        var valores = [datos[0].aprobados, datos[0].rechazados];
        var colores = ['rgb(54, 162, 235)', 'rgb(255, 99, 132)'];
        const dialogRef = this.dialog.open(ModalReportesComponent, {
          panelClass: "app-full-bleed-dialog",
          width: '800px',
          height: '650px',
          direction: 'ltr',
          autoFocus: false,
          data: { nombreReporte, labels, valores, chartBar, colores },
        });
      }
      else {
        Swal.fire({
          title: '¡No se solicitaron licencias para ese año!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  repLicenciasDiasDisponiblesXAnio() {
    this.service.GetRepLicenciasDiasDisponiblesXAnio(this.legajo_id!, this.anioSeleccionado).subscribe(datos => {
      var chartBar = true;
      var nombreReporte = 'Reporte Días Disponibles Para el Año ' + this.anioSeleccionado;

      this.arrayTiposLicencia = [];
      this.arrayCantDiasUsados = [];
      this.arrayCantDiasTotales = [];
      this.arrayCantDiasDisponibles = [];

      if (datos.length > 0) {
        for (var i = 0; i < datos.length; i++) {
          this.arrayTiposLicencia.push(datos[i].descripcion);
        }
        for (var i = 0; i < datos.length; i++) {
          this.arrayCantDiasTotales.push(datos[i].cantidadtotal);
        }
        for (var i = 0; i < datos.length; i++) {
          this.arrayCantDiasUsados.push(datos[i].cantidadusada);
        }
        for (let i = 0; i < this.arrayCantDiasTotales.length; i++) {
          const el = Math.abs((this.arrayCantDiasTotales[i] || 0) - (this.arrayCantDiasUsados[i] || 0));
          this.arrayCantDiasDisponibles.push(el);
        };
        var labels = this.arrayTiposLicencia;
        var valores = this.arrayCantDiasDisponibles;
        var colores = ['rgba(255, 99, 132)', 'rgba(255, 159, 64)', 'rgba(255, 205, 86)', 'rgba(75, 192, 192)', 'rgba(54, 162, 235)', 'rgba(153, 102, 255)', 'rgba(201, 203, 207)'];
        const dialogRef = this.dialog.open(ModalReportesComponent, {
          panelClass: "app-full-bleed-dialog",
          width: '1200px',
          height: '600px',
          direction: 'ltr',
          autoFocus: false,
          data: { nombreReporte, labels, valores, chartBar, colores },
        });
      }
      else {
        Swal.fire({
          title: '¡No hay días disponibles para este año!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }
}
