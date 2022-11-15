import { Component, OnInit, ViewChild } from '@angular/core';
import { MisTributosService } from './mis-tributos.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-tributos',
  templateUrl: './mis-tributos.component.html',
  providers: [MisTributosService, SpinnerCargaComponent],
  styleUrls: ['./mis-tributos.component.scss']
})
export class MisTributosComponent implements OnInit {

  paginaCargada;
  TributosCargados;
  columnas = ['concepto', 'clave_bien', 'descripcion', 'total_deuda'];
  dataSource;
  id_persona = sessionStorage.getItem('id_persona');
  id_jurisdiccion = sessionStorage.getItem('id_jurisdiccion');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: MisTributosService,
    public dialog: MatDialog,
    public spinner: SpinnerCargaComponent) { }

  ngOnInit(): void {
    this.traerTributos();
  }

  // abrirModalInsertar() {
  //   const dialogRef = this.dialog.open(DialogExampleComponent, {
  //     panelClass: "app-full-bleed-dialog",
  //     width: '1500px',
  //     height: '600px',
  //     direction: 'ltr',
  //     autoFocus: false,
  //     data: { insertar: true },
  //   });
  // }

  traerTributos() {
    this.spinner.cargarSpinner();
    this.service.getMisTributos(this.id_persona!, this.id_jurisdiccion!).subscribe(datos => {
      const TributosListado: any[] = [];
      if (datos.length == 0) {
        Swal.fire({
          title: '¡No hay tributos asociados!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        for (let i = 0; i < datos.length; i++) {
          TributosListado.push([datos[i].concepto, datos[i].clave_bien]);
        }
        this.dataSource = new MatTableDataSource(datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.TributosCargados = true;
        this.paginaCargada = true;
        this.spinner.sacarSpinner();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
