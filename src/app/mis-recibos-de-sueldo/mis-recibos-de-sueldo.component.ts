import { Component, OnInit, ViewChild } from '@angular/core';
import { MisRecibosSueldoService } from './mis-recibos-de-sueldo.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-recibos-de-sueldo',
  templateUrl: './mis-recibos-de-sueldo.component.html',
  providers: [MisRecibosSueldoService, SpinnerCargaComponent],
  styleUrls: ['./mis-recibos-de-sueldo.component.scss']
})
export class MisRecibosDeSueldoComponent implements OnInit {

  anioSeleccionado;
  aniosList;
  RecibosCargados;
  Recibos;
  columnas = ['recibo_id', 'periodo', 'fecha_conformidad', 'conformidad', 'archivo'];
  dataSource;
  id_persona = sessionStorage.getItem('id_persona');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  Archivo;

  constructor(private service: MisRecibosSueldoService, public spinner: SpinnerCargaComponent) { }

  ngOnInit(): void {
    this.RecibosCargados = false;
    this.aniosList = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
  }

  verArchivo(archivo, nombreArchivo) {
    if (nombreArchivo.split('.').pop() == 'pdf') {
      let ventana = window.open("");
      ventana!.document.write(
        "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(archivo) + "'></iframe>"
      )
    }
    else {
      Swal.fire({
        title: 'El archivo detectado no posee extensión PDF, por lo que no se puede abrir.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  traerRecibos() {
    this.RecibosCargados = false;
    this.spinner.cargarSpinner();
    this.service.getMisRecibosSueldo(this.id_persona!, this.anioSeleccionado).subscribe(datos => {
      const RecibosListado: any[] = [];
      if (datos.length == 0) {
        Swal.fire({
          title: '¡No hay recibos asociados!',
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
        this.RecibosCargados = true;
      }
      this.spinner.sacarSpinner();
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.name.split('.').pop() == 'pdf') {
          this.Archivo = (reader.result as string).substring((reader.result as string).indexOf(',') + 1);
        }
        else {
          Swal.fire({
            title: '¡El archivo debe ser una extensión PDF!',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
          this.limpiarFileInput(event.target);
        }
      }
    }
  }

  limpiarFileInput(f) {
    if (f.value) {
      try {
        f.value = '';
      } catch (err) { }
      if (f.value) {
        var form = document.createElement('form'),
          parentNode = f.parentNode, ref = f.nextSibling;
        form.appendChild(f);
        form.reset();
        parentNode.insertBefore(f, ref);
      }
    }
  }

  updateRecibos() {
    this.RecibosCargados = false;
    this.spinner.cargarSpinner();
    this.service.updateMisRecibosSueldo(this.Archivo).subscribe(datos => {
      console.log(datos)
      const RecibosListado: any[] = [];
      if (datos.length == 0) {
        Swal.fire({
          title: '¡Se actualizaron los recibos!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al actualizar los recibos!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
      }
      this.spinner.sacarSpinner();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
