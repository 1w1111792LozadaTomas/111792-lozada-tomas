import { Component, OnInit, Inject, NgModule, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerCargaComponent } from '../../utilidades/spinner-carga/spinner-carga.component'
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MisAdelantosSolicitadosDetallesService } from './modal-mis-adelantos-solicitados-detalles.service'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2'

export interface DialogData {
  nroAdelanto: string;
  idVale: string;
}

@Component({
  selector: 'app-modal-mis-adelantos-solicitados-detalles',
  templateUrl: './modal-mis-adelantos-solicitados-detalles.component.html',
  providers: [SpinnerCargaComponent, MisAdelantosSolicitadosDetallesService],
  styleUrls: ['./modal-mis-adelantos-solicitados-detalles.component.scss']
})


export class ModalMisAdelantosSolicitadosDetallesComponent implements OnInit {

  titulo;
  vale_id;
  columnas = ['anio', 'mes', 'monto', 'pagado'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<ModalMisAdelantosSolicitadosDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: MisAdelantosSolicitadosDetallesService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.idVale, data.nroAdelanto)
  }

  datos(vale_id: string, nroAdelanto: string): void {
    this.titulo = 'Ver Detalles Solicitud de Adelanto Número: ' + nroAdelanto;
    this.vale_id = vale_id;
  }

  ngOnInit(): void {
    this.traerMisAdelantosDetalles();
  }

  traerMisAdelantosDetalles() {
    this.spinner.cargarSpinner();
    this.service.getAdelantosDetalles(this.vale_id).subscribe(datos => {
      if (datos.length == 0) {
        Swal.fire({
          title: '¡El adelanto no posee detalles!',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        this.dataSource = new MatTableDataSource(datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      this.spinner.sacarSpinner();
    });
  }
}
