import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalMisMensajesService } from './modal-mis-mensajes.service'
import { SpinnerCargaComponent } from '../../utilidades/spinner-carga/spinner-carga.component'
import { MAT_DATE_FORMATS } from '@angular/material/core';
import Swal from 'sweetalert2'

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

export interface DialogData {
  insertar: boolean;
  soloLectura: any;
  idEditar: any;
  esRespuesta: any;
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './modal-mis-mensajes.component.html',
  providers: [ModalMisMensajesService, SpinnerCargaComponent, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  styleUrls: ['./modal-mis-mensajes.component.scss']
})

export class ModalMisMensajesComponent implements OnInit {

  MensajeForm = new FormGroup({
    IdBandejaMensaje: new FormControl({ value: null, disabled: false }),
    IdLegajo: new FormControl({ value: '', disabled: false }),
    IdLegajoDestinatario: new FormControl({ value: null, disabled: false }, [Validators.required]),
    Asunto: new FormControl({ value: '', disabled: false }, [Validators.required]),
    Mensaje1: new FormControl({ value: null, disabled: false }, [Validators.required]),
    MensajeR: new FormControl({ value: null, disabled: false }),
    Archivo: new FormControl({ value: '', disabled: false }),
    NombreArchivo: new FormControl({ value: null, disabled: false }),
    ArchivoR: new FormControl({ value: '', disabled: false }),
    NombreArchivoR: new FormControl({ value: null, disabled: false }),
    AsuntoOriginal: new FormControl({ value: null, disabled: false }),
    ArchivoOriginal: new FormControl({ value: null, disabled: false }),
    NombreArchivoOriginal: new FormControl({ value: null, disabled: false }),
    MensajeOriginal: new FormControl({ value: null, disabled: false })
  })

  insertar;
  idEditar;
  titulo;
  srcResult;
  botonDesactivado;
  nombreBoton;
  ListadoDestinatarios;
  soloLectura;
  nombreBotonPDF;
  nombreSelectDestinatario
  nombreArchivoMensaje;
  archivoMensajeR;
  nombreArchivoMensajeR;
  archivoMensajeOriginal;
  nombreArchivoMensajeOriginal;
  archivoMensaje;
  esRespuesta;
  respuestaAbierto = false;
  originalAbierto = false;
  esMensajeRespuesta;
  tieneMensajeRespuesta;
  legajo_id = sessionStorage.getItem('legajo_id');

  constructor(public dialogRef: MatDialogRef<ModalMisMensajesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ModalMisMensajesService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.insertar, data.idEditar, data.soloLectura, data.esRespuesta)
  }

  ngOnInit(): void {
    this.MensajeForm.patchValue({
      IdLegajo: this.legajo_id!
    });
    this.esMensajeRespuesta = false;
    this.tieneMensajeRespuesta = false;
    this.respuestaAbierto = false;
    this.originalAbierto = false;
    this.service.getLegajosDestinatarios(this.legajo_id!).subscribe(datos => { this.ListadoDestinatarios = datos; });
    this.nombreSelectDestinatario = 'Destinatario';
    if (this.idEditar) {
      this.traerParaEditarMensaje(this.idEditar);
      if (this.soloLectura) {
        this.MensajeForm.controls['IdLegajoDestinatario'].disable();
        this.MensajeForm.controls['Asunto'].disable();
        this.MensajeForm.controls['Mensaje1'].disable();
        this.MensajeForm.controls['Archivo'].disable();
        this.MensajeForm.controls['ArchivoR'].disable();
      }
      this.esRespuesta ? this.nombreSelectDestinatario = 'Enviado por:' : this.nombreSelectDestinatario = 'Para:'
    }
  }

  datos(insertar: boolean, idEditar: any, soloLectura: any, esRespuesta: any): void {
    this.insertar = insertar;
    this.idEditar = idEditar;
    this.soloLectura = soloLectura;
    this.esRespuesta = esRespuesta;
    this.insertar ? this.titulo = 'Redactar Mensaje' : this.titulo = 'Ver Mensaje';
    this.nombreBoton = 'Enviar';
    this.soloLectura ? this.nombreBotonPDF = 'Ver PDF Adjunto' : this.nombreBotonPDF = 'Adjuntar PDF';
  }

  cargando() {
    this.botonDesactivado = true;
    this.spinner.cargarSpinner();
  }

  terminaCarga() {
    this.botonDesactivado = false;
    this.spinner.sacarSpinner();
  }

  traerParaEditarMensaje(id_bandeja_mensaje) {
    this.service.getTraerParaEditarMensaje(id_bandeja_mensaje, this.legajo_id!).subscribe(datos => {
      this.tieneMensajeRespuesta = datos[0].respuesta;
      this.MensajeForm.patchValue({
        IdBandejaMensaje: this.idEditar,
        IdLegajoDestinatario: datos[0].id_legajo_destinatario,
        Asunto: datos[0].asunto,
        Mensaje1: datos[0].mensaje,
        Archivo: datos[0].archivo,
        NombreArchivo: datos[0].nombre_archivo
      });
      if (this.esRespuesta) {
        this.MensajeForm.patchValue({
          IdLegajoDestinatario: datos[0].legajo_id
        });
      }
      this.archivoMensaje = this.MensajeForm.get('Archivo')?.value;
      this.nombreArchivoMensaje = this.MensajeForm.get('NombreArchivo')?.value;
    });
    this.traerOriginal(this.idEditar);
  }

  alertaRespuesta() {
    Swal.fire({
      title: '¡Ya has respondido a este mensaje!',
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    })
    return;
  }

  traerOriginal(id_bandeja_mensaje) {
    this.service.getTraerOriginal(id_bandeja_mensaje).subscribe(datos => {
      if (datos.length > 0) {
        this.esMensajeRespuesta = false;
        this.MensajeForm.patchValue({
          AsuntoOriginal: datos[0].asunto,
          ArchivoOriginal: datos[0].archivo,
          NombreArchivoOriginal: datos[0].nombre_archivo,
          MensajeOriginal: datos[0].mensaje
        });
        this.archivoMensajeOriginal = this.MensajeForm.get('ArchivoOriginal')?.value;
        this.nombreArchivoMensajeOriginal = this.MensajeForm.get('NombreArchivoOriginal')?.value;
      }
      else {
        this.esMensajeRespuesta = true;
      }
    });
    this.MensajeForm.controls['AsuntoOriginal'].disable();
    this.MensajeForm.controls['MensajeOriginal'].disable();
  }

  onFileChange(event) {
    this.srcResult = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.name.split('.').pop() == 'pdf') {
          this.MensajeForm.patchValue({
            Archivo: (reader.result as string).substring((reader.result as string).indexOf(',') + 1),
            NombreArchivo: file.name
          });
          this.archivoMensaje = this.MensajeForm.get('Archivo')?.value;
          this.nombreArchivoMensaje = this.MensajeForm.get('NombreArchivo')?.value;
          this.srcResult = 'cargado'
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

  onFileChangeRespuesta(event) {
    this.srcResult = null;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.name.split('.').pop() == 'pdf') {
          this.MensajeForm.patchValue({
            ArchivoR: (reader.result as string).substring((reader.result as string).indexOf(',') + 1),
            NombreArchivoR: file.name
          });
          this.archivoMensajeR = this.MensajeForm.get('ArchivoR')?.value;
          this.nombreArchivoMensajeR = this.MensajeForm.get('NombreArchivoR')?.value;
          this.srcResult = 'cargado'
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

  verArchivo(archivo, nombreArchivo) {
    if (nombreArchivo != null && nombreArchivo != '') {
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
    else {
      Swal.fire({
        title: 'No hay archivo cargado.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
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

  submitFormulario() {
    this.respuestaAbierto ? this.addMensajeRespuesta() : this.addMensaje();
  }

  addMensaje() {
    if (this.MensajeForm.valid) {
      this.cargando();
      this.service.addMensaje(this.MensajeForm.getRawValue()).subscribe(datos => {
        if (datos[0].insertar_vale == null) {
          Swal.fire({
            title: '¡Se ha enviado el mensaje!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.dialogRef.close();
        }
        else {
          Swal.fire({
            title: '¡Ocurrió un error al enviar el mensaje!',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        this.terminaCarga();
      });
    }
    else {
      Swal.fire({
        title: '¡Datos inválidos!',
        text: 'Verifique que los datos ingresados sean correctos y que todos los campos obligatorios estén llenos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  addMensajeRespuesta() {
    if (this.MensajeForm.get('MensajeR')!.value == null) {
      Swal.fire({
        title: '¡Datos inválidos!',
        text: 'Verifique que los datos ingresados sean correctos y que todos los campos obligatorios estén llenos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    var asuntoRespuesta;
    this.MensajeForm.get('Asunto')!.value!.startsWith('RE:') ? asuntoRespuesta = this.MensajeForm.get('Asunto')!.value! : asuntoRespuesta = 'RE: ' + this.MensajeForm.get('Asunto')!.value,
      this.MensajeForm.patchValue({
        Asunto: asuntoRespuesta,
        Mensaje1: this.MensajeForm.get('MensajeR')!.value,
        Archivo: this.MensajeForm.get('ArchivoR')!.value,
        NombreArchivo: this.MensajeForm.get('NombreArchivoR')!.value
      });
    if (this.MensajeForm.valid) {
      this.cargando();
      this.service.addMensajeRespuesta(this.MensajeForm.getRawValue()).subscribe(datos => {
        if (datos[0].insertar_vale == null) {
          Swal.fire({
            title: '¡Se ha enviado el mensaje!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.dialogRef.close();
        }
        else {
          Swal.fire({
            title: '¡Ocurrió un error al enviar el mensaje!',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        this.terminaCarga();
      });
    }
    else {
      Swal.fire({
        title: '¡Datos inválidos!',
        text: 'Verifique que los datos ingresados sean correctos y que todos los campos obligatorios estén llenos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }
  }
}

