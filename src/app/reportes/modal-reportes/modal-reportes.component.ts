import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Chart } from '../../../../node_modules/chart.js'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalReportesService } from './modal-reportes.service'
import { SpinnerCargaComponent } from '../../utilidades/spinner-carga/spinner-carga.component'
import Swal from 'sweetalert2'
import { registerables } from 'chart.js';
import { takeLast } from 'rxjs';

export interface DialogData {
  nombreReporte: string;
  labels: any;
  valores: any;
  chartBar: boolean;
  colores: any;
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './modal-reportes.component.html',
  providers: [ModalReportesService, SpinnerCargaComponent],
  styleUrls: ['./modal-reportes.component.scss']
})

export class ModalReportesComponent implements OnInit {

  botonDesactivado;
  nombreReporte;
  labels;
  valores;
  chartADestruir;
  chartBar;
  colores;

  constructor(public dialogRef: MatDialogRef<ModalReportesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ModalReportesService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.nombreReporte, data.labels, data.valores, data.chartBar, data.colores)
  }

  ngOnInit(): void {
    Chart.register(...registerables);
    if (this.chartBar) {
      this.reporteBar();
    }
    else {
      this.reportePie();
    }
  }

  datos(nombreReporte, labels, valores, chartBar, colores): void {
    this.nombreReporte = nombreReporte;
    this.labels = labels;
    this.valores = valores;
    this.chartBar = chartBar;
    this.colores = colores;
  }

  cargando() {
    this.botonDesactivado = true;
    this.spinner.cargarSpinner();
  }

  terminaCarga() {
    this.botonDesactivado = false;
    this.spinner.sacarSpinner();
  }

  reportePie() {
    if (this.chartADestruir != null) {
      this.chartADestruir.destroy();
    }
    const myChart = new Chart('chart', {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.nombreReporte,
          data: this.valores,
          backgroundColor: this.colores,
          hoverOffset: 4
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            display: false
          }
        }
      }
    });
    this.chartADestruir = myChart;
  }

  reporteBar() {
    if (this.chartADestruir != null) {
      this.chartADestruir.destroy();
    }
    const data = {
      labels: this.labels,
      datasets: [{
        label: 'Días Disponibles',
        data: this.valores,
        backgroundColor: this.colores,
        borderWidth: 1
      }]
    };
    const myChart = new Chart('chart', {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
    this.chartADestruir = myChart;
  }
}

