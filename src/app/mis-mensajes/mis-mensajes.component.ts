import { Component, OnInit, ViewChild } from '@angular/core';
import { MisMensajesService } from './mis-mensajes.service';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalMisMensajesComponent } from './modal-mis-mensajes/modal-mis-mensajes.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-mensajes',
  templateUrl: './mis-mensajes.component.html',
  providers: [MisMensajesService, SpinnerCargaComponent],
  styleUrls: ['./mis-mensajes.component.scss']
})
export class MisMensajesComponent implements OnInit {

  MensajesCargados;
  paginaCargada;
  columnas1 = ['checkMensaje', 'emisor', 'fecha', 'asunto', 'ver_mensaje'];
  columnas2 = ['checkMensaje', 'receptor', 'fecha', 'asunto', 'ver_mensaje'];
  columnas3 = ['checkMensaje', 'receptor', 'fecha', 'asunto', 'ver_mensaje'];
  columnas4 = ['checkMensaje', 'receptor', 'fecha', 'asunto', 'ver_mensaje'];
  dataSource;
  dataSource2;
  dataSource3;
  dataSource4;
  nroTabActivo;
  seleccionarTodos;
  arrayMensajesSeleccionados: number[] = [];
  arraySeleccionadosTodos: number[] = [];
  legajo_id = sessionStorage.getItem('legajo_id');
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: MisMensajesService,
    public dialog: MatDialog,
    public spinner: SpinnerCargaComponent) { }

  ngOnInit(): void {
    this.seleccionarTodos = false;
    this.nroTabActivo = 1;
    this.traerRespuestas();
  }

  cambiarPestania(event) {
    if (event.tab.textLabel == "Bandeja de Entrada") {
      this.nroTabActivo = 1;
      this.traerRespuestas();
    }
    else if (event.tab.textLabel == "Enviados") {
      this.nroTabActivo = 2;
      this.traerMensajes();
    }
    else if (event.tab.textLabel == "Papelera") {
      this.nroTabActivo = 3;
      this.traerMensajesBaja();
    }
    else if (event.tab.textLabel == "Favoritos") {
      this.nroTabActivo = 4;
      this.traerMensajesFavoritos();
    }
  }

  abrirModalInsertar() {
    const dialogRef = this.dialog.open(ModalMisMensajesComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '600px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: true },
    });
    dialogRef.afterClosed().subscribe(() => {
      switch (this.nroTabActivo) {
        case 1:
          this.traerRespuestas();
          break;
        case 2:
          this.traerMensajes();
          break;
        case 3:
          this.traerMensajesBaja();
          break;
        case 4:
          this.traerMensajesFavoritos();
          break;
      }
    });
  }

  seleccionado(idMensaje: any, event) {
    if (event.checked == true) {
      this.arrayMensajesSeleccionados.push(parseInt(idMensaje));
    }
    else {
      const index = this.arrayMensajesSeleccionados.indexOf(idMensaje);
      if (index > -1) {
        this.arrayMensajesSeleccionados.splice(index, 1);
      }
    }
  }

  abrirModalEditar(idEditar, soloLectura, esRespuesta) {

    const dialogRef = this.dialog.open(ModalMisMensajesComponent, {
      panelClass: "app-full-bleed-dialog",
      width: '1500px',
      height: '600px',
      direction: 'ltr',
      autoFocus: false,
      data: { insertar: false, idEditar: idEditar, soloLectura: soloLectura, esRespuesta: esRespuesta },
    });
    dialogRef.afterClosed().subscribe(() => {
      switch (this.nroTabActivo) {
        case 1:
          this.traerRespuestas();
          break;
        case 2:
          this.traerMensajes();
          break;
        case 3:
          this.traerMensajesBaja();
          break;
        case 4:
          this.traerMensajesFavoritos();
          break;
      }
    });
  }

  traerRespuestas() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.seleccionarTodo(false);
    this.arraySeleccionadosTodos = [];
    this.spinner.cargarSpinner();
    this.service.getMisRespuestas(this.legajo_id!).subscribe(datos => {
      if (datos.length == 0) {
        Swal.fire({
          title: '¡La casilla está vacía!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        for (var i = 0; i < datos.length; i++) {
          this.arraySeleccionadosTodos.push(parseInt(datos[i].id_bandeja_mensaje));
        }
        this.dataSource = new MatTableDataSource(datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.MensajesCargados = true;
        this.paginaCargada = true;
        this.spinner.sacarSpinner();
      }
    });
  }

  traerMensajes() {
    this.dataSource2 = new MatTableDataSource();
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;

    this.seleccionarTodo(false);
    this.arraySeleccionadosTodos = [];
    this.spinner.cargarSpinner();
    this.service.getMisMensajes(this.legajo_id!).subscribe(datos => {
      if (datos.length == 0) {
        Swal.fire({
          title: '¡No has enviado ningun mensaje!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        for (var i = 0; i < datos.length; i++) {
          this.arraySeleccionadosTodos.push(parseInt(datos[i].id_bandeja_mensaje));
        }

        this.dataSource2 = new MatTableDataSource(datos);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
        this.MensajesCargados = true;
        this.paginaCargada = true;
        this.spinner.sacarSpinner();
      }
    });
  }

  traerMensajesBaja() {
    this.dataSource3 = new MatTableDataSource();
    this.dataSource3.sort = this.sort;
    this.dataSource3.paginator = this.paginator;

    this.seleccionarTodo(false);
    this.arraySeleccionadosTodos = [];
    this.spinner.cargarSpinner();
    this.service.getMisMensajesBaja(this.legajo_id!).subscribe(datos => {
      if (datos.length == 0) {
        Swal.fire({
          title: '¡La papelera está vacía!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        for (var i = 0; i < datos.length; i++) {
          this.arraySeleccionadosTodos.push(parseInt(datos[i].id_bandeja_mensaje));
        }

        this.dataSource3 = new MatTableDataSource(datos);
        this.dataSource3.sort = this.sort;
        this.dataSource3.paginator = this.paginator;
        this.MensajesCargados = true;
        this.paginaCargada = true;
        this.spinner.sacarSpinner();
      }
    });
  }

  traerMensajesFavoritos() {
    this.dataSource4 = new MatTableDataSource();
    this.dataSource4.sort = this.sort;
    this.dataSource4.paginator = this.paginator;

    this.seleccionarTodo(false);
    this.arraySeleccionadosTodos = [];
    this.spinner.cargarSpinner();
    this.service.getMisMensajesFavoritos(this.legajo_id!).subscribe(datos => {
      console.log(datos)
      if (datos.length == 0) {
        Swal.fire({
          title: '¡No tienes mensajes favoritos!',
          icon: 'info',
          confirmButtonText: 'Aceptar'
        })
        this.spinner.sacarSpinner();
        return;
      }
      else {
        for (var i = 0; i < datos.length; i++) {
          this.arraySeleccionadosTodos.push(parseInt(datos[i].id_bandeja_mensaje));
        }

        this.dataSource4 = new MatTableDataSource(datos);
        this.dataSource4.sort = this.sort;
        this.dataSource4.paginator = this.paginator;
        this.MensajesCargados = true;
        this.paginaCargada = true;
        this.spinner.sacarSpinner();
      }
    });
  }

  seleccionarTodo(x) {
    if (x) {
      if (this.arrayMensajesSeleccionados.length > 0) { this.arrayMensajesSeleccionados = []; }
      this.arrayMensajesSeleccionados = this.arraySeleccionadosTodos;
      this.seleccionarTodos = true
    }
    else {
      this.arrayMensajesSeleccionados = []
      this.seleccionarTodos = false;
    }
  }

  modalMensajesPasarLeido(estado) {
    if (this.arrayMensajesSeleccionados.length == 0) {
      Swal.fire({
        title: '¡Seleccione al menos un mensaje!',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    if (estado == true) {
      Swal.fire({
        title: '¿Está seguro que desea marcar la selección como leído?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.SendMensajesPasarLeido(this.arrayMensajesSeleccionados, estado);
        }
      })
    }
    else {
      Swal.fire({
        title: '¿Está seguro que desea marcar la selección como no leído?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.SendMensajesPasarLeido(this.arrayMensajesSeleccionados, estado);
        }
      })
    }
  }

  SendMensajesPasarLeido(mensajes, estado) {
    this.service.SendMensajesPasarLeido(mensajes, this.legajo_id!, estado).subscribe(datos => {
      if (datos[0].pasar_mensajes_leido == null) {
        if (estado == true) {
          Swal.fire({
            title: '¡Se pasó la selección a leídos!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              switch (this.nroTabActivo) {
                case 1:
                  this.traerRespuestas();
                  break;
                case 2:
                  this.traerMensajes();
                  break;
                case 3:
                  this.traerMensajesBaja();
                  break;
                case 4:
                  this.traerMensajesFavoritos();
                  break;
              }
            }
          })
        }
        else {
          Swal.fire({
            title: '¡Se pasó la selección a no leídos!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              switch (this.nroTabActivo) {
                case 1:
                  this.traerRespuestas();
                  break;
                case 2:
                  this.traerMensajes();
                  break;
                case 3:
                  this.traerMensajesBaja();
                  break;
                case 4:
                  this.traerMensajesFavoritos();
                  break;
              }
            }
          })
        }
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al intentar realizar esta acción!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  modalMandarMensajesPapelera(estado) {
    if (this.arrayMensajesSeleccionados.length == 0) {
      Swal.fire({
        title: '¡Seleccione al menos un mensaje!',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    if (estado) {
      Swal.fire({
        title: '¿Está seguro que desea mandar la selección a la papelera?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.SendMensajesAPapelera(this.arrayMensajesSeleccionados, estado);
        }
      })
    }
    else {
      Swal.fire({
        title: '¿Está seguro que desea mandar la selección a recibidos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.SendMensajesAPapelera(this.arrayMensajesSeleccionados, estado);
        }
      })
    }
  }

  SendMensajesAPapelera(mensajes, estado) {
    this.service.sendMensajesAPapelera(mensajes, this.legajo_id!, estado).subscribe(datos => {
      if (datos[0].mensajes_a_papelera == null) {
        if (estado) {
          Swal.fire({
            title: '¡Se envió la selección a la papelera!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              switch (this.nroTabActivo) {
                case 1:
                  this.traerRespuestas();
                  break;
                case 2:
                  this.traerMensajes();
                  break;
                case 3:
                  this.traerMensajesBaja();
                  break;
                case 4:
                  this.traerMensajesFavoritos();
                  break;
              }
            }
          })
        } else {
          Swal.fire({
            title: '¡Se envió la selección a recibidos!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              switch (this.nroTabActivo) {
                case 1:
                  this.traerRespuestas();
                  break;
                case 2:
                  this.traerMensajes();
                  break;
                case 3:
                  this.traerMensajesBaja();
                  break;
                case 4:
                  this.traerMensajesFavoritos();
                  break;
              }
            }
          })
        }
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al intentar realizar esta acción!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  modalEliminarMensajesPapelera() {
    if (this.arrayMensajesSeleccionados.length == 0) {
      Swal.fire({
        title: '¡Seleccione al menos un mensaje!',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    Swal.fire({
      title: '¿Está seguro que desea eliminar la selección de la papelera? Los cambios serán permanentes.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.SendEliminarMensajesPapelera(this.arrayMensajesSeleccionados);
      }
    })
  }

  SendEliminarMensajesPapelera(mensajes) {
    this.service.SendEliminarMensajesPapelera(mensajes, this.legajo_id!).subscribe(datos => {
      if (datos[0].mensajes_a_papelera == null) {
        Swal.fire({
          title: '¡Se eliminó la selección de la papelera!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            switch (this.nroTabActivo) {
              case 1:
                this.traerRespuestas();
                break;
              case 2:
                this.traerMensajes();
                break;
              case 3:
                this.traerMensajesBaja();
                break;
              case 4:
                this.traerMensajesFavoritos();
                break;
            }
          }
        })
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al intentar realizar esta acción!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }

  modalMensajesPasarFavoritos(estado) {
    if (this.arrayMensajesSeleccionados.length == 0) {
      Swal.fire({
        title: '¡Seleccione al menos un mensaje!',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    if (estado == true) {
      Swal.fire({
        title: '¿Está seguro que desea marcar la selección como favoritos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.SendMensajesPasarAFavoritos(this.arrayMensajesSeleccionados, estado);
        }
      })
    }
    else {
      Swal.fire({
        title: '¿Está seguro que desea quitar la selección de favoritos?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.SendMensajesPasarAFavoritos(this.arrayMensajesSeleccionados, estado);
        }
      })
    }
  }

  SendMensajesPasarAFavoritos(mensajes, estado) {
    this.service.SendMensajesPasarAFavoritos(mensajes, this.legajo_id!, estado).subscribe(datos => {
      if (datos[0].pasar_mensajes_leido == null) {
        if (estado == true) {
          Swal.fire({
            title: '¡Se pasó la selección a favoritos!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              switch (this.nroTabActivo) {
                case 1:
                  this.traerRespuestas();
                  break;
                case 2:
                  this.traerMensajes();
                  break;
                case 3:
                  this.traerMensajesBaja();
                  break;
                case 4:
                  this.traerMensajesFavoritos();
                  break;
              }
            }
          })
        }
        else {
          Swal.fire({
            title: '¡Se quitó la selección de favoritos!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result) => {
            if (result.isConfirmed) {
              switch (this.nroTabActivo) {
                case 1:
                  this.traerRespuestas();
                  break;
                case 2:
                  this.traerMensajes();
                  break;
                case 3:
                  this.traerMensajesBaja();
                  break;
                case 4:
                  this.traerMensajesFavoritos();
                  break;
              }
            }
          })
        }
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al intentar realizar esta acción!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }
}
