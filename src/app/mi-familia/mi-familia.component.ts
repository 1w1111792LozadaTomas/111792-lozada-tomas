import { Component, OnInit, ViewChild } from '@angular/core';
import { MisFamiliaService } from './mi-familia.service'
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalGrupoFamiliarComponent } from './modal-grupo-familiar/modal-grupo-familiar.component';

@Component({
  selector: 'app-mi-familia',
  templateUrl: './mi-familia.component.html',
  providers: [MisFamiliaService, SpinnerCargaComponent],
  styleUrls: ['./mi-familia.component.scss']
})
export class MiFamiliaComponent implements OnInit {

  paginaCargada;
  insertar;
  FamiliaresCargados;
  columnas = ['nombre', 'nro_documento', 'edad', 'id_parentesco1', 'fecha_nac1', 'discapacitado1', 'escolaridad1', 'a_cargo', 'fecha_baja1', 'ver', 'editar', 'anular'];
  dataSource;
  legajo_id = sessionStorage.getItem('legajo_id');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: MisFamiliaService,
    public dialog: MatDialog,
    public spinner: SpinnerCargaComponent) { }
    public innerWidth: any;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.traerGrupoFamiliar();
  }

  abrirModalInsertar() {
    const dialogRef = this.dialog.open(ModalGrupoFamiliarComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '610px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: true },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerGrupoFamiliar(); });
  }

  abrirModalEditar(idEditar, nombreCompleto, soloLectura,) {
    this.insertar = true;
    const dialogRef = this.dialog.open(ModalGrupoFamiliarComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '610px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: false, idEditar: idEditar, nombreCompleto: nombreCompleto, soloLectura: soloLectura },
    });
    dialogRef.afterClosed().subscribe(() => { this.traerGrupoFamiliar(); });
  }

  public traerGrupoFamiliar() {
    this.FamiliaresCargados = false;
    this.spinner.cargarSpinner();
    this.service.getGrupoFamiliar(this.legajo_id!).subscribe(datos => {
      const FamiliaListado: any[] = [];
      if (datos != null) {
        if (datos.length == 0) {
          Swal.fire({
            title: '¡No se encontró un grupo familiar!',
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
          this.FamiliaresCargados = true;
          this.paginaCargada = true;
        }
      }
      else {
        Swal.fire({
          title: '¡No se encontró un grupo familiar!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
      }
      this.FamiliaresCargados = true;
      this.spinner.sacarSpinner();
    });
  }

  deleteFamiliar(idEliminar, nombreCompleto) {
    var userBaja = 'admin';
    this.service.deleteFamiliar(idEliminar, userBaja).subscribe(datos => {
      if (datos[0].eliminar_familiar == null) {
        Swal.fire({
          title: '¡Se ha eliminado a ' + nombreCompleto,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.traerGrupoFamiliar();
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al intentar eliminar a ' + nombreCompleto,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  modalBorrar(idEliminar, nombreCompleto) {
    Swal.fire({
      title: '¿Está seguro que desea dar de baja a ' + nombreCompleto + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteFamiliar(idEliminar, nombreCompleto);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

