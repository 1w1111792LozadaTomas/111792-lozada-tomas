import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MisLicenciasSolicitadasService } from './modal-mis-licencias-solicitadas.service';
import Swal from 'sweetalert2'
import { SpinnerCargaComponent } from '../../utilidades/spinner-carga/spinner-carga.component'
import { MAT_DATE_FORMATS } from '@angular/material/core';

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

declare var require: any;
var $ = require('jquery');

export interface DialogData {
  insertar: boolean;
  idEditar: any;
  soloLectura: any;
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './modal-mis-licencias-solicitadas.component.html',
  providers: [MisLicenciasSolicitadasService, SpinnerCargaComponent, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  styleUrls: ['./modal-mis-licencias-solicitadas.component.scss']
})

export class ModalMisLicenciasSolicitadasComponent implements OnInit {

  legajo_id = sessionStorage.getItem('legajo_id');
  legajo_id_num = parseInt(this.legajo_id!);

  solicitudesLicenciaForm = new FormGroup({
    IdLicencia: new FormControl({ value: null, disabled: false }),
    IdLegajo: new FormControl({ value: this.legajo_id_num!, disabled: false }),
    Anio: new FormControl({ value: null, disabled: false }, [Validators.required]),
    IdTipoLicencia: new FormControl({ value: null, disabled: true }, [Validators.required]),
    UsrIng: new FormControl({ value: '', disabled: true }, [Validators.required]),
    UsrMod: new FormControl({ value: '', disabled: true }, [Validators.required]),
    FecInicio: new FormControl({ value: null, disabled: false }, [Validators.required]),
    FecFin: new FormControl({ value: null, disabled: false }, [Validators.required]),
    Detalles: new FormControl({ value: '', disabled: false }, [Validators.required]),
    CantDiasDisponibles: new FormControl({ value: 0, disabled: false }),
    NombreArchivo: new FormControl({ value: '', disabled: false }),
    Archivo: new FormControl({ value: '', disabled: false })
  })

  insertar;
  idEditar;
  titulo;
  aniosList;
  ListadoTiposLicencia;
  botonDesactivado;
  activadoComboLicencias;
  Cantidad_Dias_Disponibles = 0;
  Cantidad_Dias_Usados = 0;
  nombreBoton;
  soloLectura;
  archivo;
  nombreArchivo;
  tomarAnioAnterior;

  constructor(public dialogRef: MatDialogRef<ModalMisLicenciasSolicitadasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: MisLicenciasSolicitadasService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.insertar, data.idEditar, data.soloLectura)
  }

  ngOnInit(): void {
    this.activadoComboLicencias = false;
    this.aniosList = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    this.service.getTiposLicenciaListado(2372).subscribe(datos => { this.ListadoTiposLicencia = datos; });
    if (this.idEditar) {
      this.traerParaEditarLicencia(this.idEditar);
      if (this.soloLectura) {
        this.solicitudesLicenciaForm.controls['Anio'].disable();
        this.solicitudesLicenciaForm.controls['IdTipoLicencia'].disable();
        this.solicitudesLicenciaForm.controls['FecInicio'].disable();
        this.solicitudesLicenciaForm.controls['FecFin'].disable();
        this.solicitudesLicenciaForm.controls['Detalles'].disable();
      }
    }
  }

  datos(insertar: boolean, idEditar: any, soloLectura: any): void {
    if (soloLectura)
      this.titulo = 'Ver Solicitud de Licencia Número: ' + idEditar;
    else {
      insertar ? this.titulo = 'Nueva Solicitud de Licencia' : this.titulo = 'Editar Solicitud de Licencia Número: ' + idEditar;
      insertar ? this.nombreBoton = 'Agregar' : this.nombreBoton = 'Guardar Cambios';
    }
    this.insertar = insertar;
    this.idEditar = idEditar;
    this.soloLectura = soloLectura;
  }

  submitFormulario() {
    this.insertar ? this.addLicencia() : this.updateLicencia();
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.name.split('.').pop() == 'pdf') {
          this.solicitudesLicenciaForm.patchValue({
            Archivo: (reader.result as string).substring((reader.result as string).indexOf(',') + 1),
            NombreArchivo: file.name
          });
          this.archivo = this.solicitudesLicenciaForm.get('Archivo')!.value!;
          this.nombreArchivo = this.solicitudesLicenciaForm.get('NombreArchivo')!.value!;
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

  cargando() {
    this.botonDesactivado = true;
    this.spinner.cargarSpinner();
  }

  terminaCarga() {
    this.botonDesactivado = false;
    this.spinner.sacarSpinner();
  }

  traerParaEditarLicencia(licencia_id) {
    this.service.getTraerParaEditarLicencia(licencia_id).subscribe(datos => {
      this.solicitudesLicenciaForm.patchValue({
        IdLicencia: this.idEditar,
        Anio: datos[0].pertenece_anio,
        IdTipoLicencia: datos[0].tipo_licencia_id,
        FecInicio: datos[0].inicio,
        FecFin: datos[0].fin,
        Detalles: datos[0].detalles,
        Archivo:datos[0].archivo,
        NombreArchivo:datos[0].nombrearchivo
      });
      this.archivo = this.solicitudesLicenciaForm.get('Archivo')!.value!;
      this.nombreArchivo = this.solicitudesLicenciaForm.get('NombreArchivo')!.value!;
    });
  }

  updateLicencia() {
    if (this.solicitudesLicenciaForm.valid) {
      this.cargando();
      this.solicitudesLicenciaForm.patchValue({
        CantDiasDisponibles: this.Cantidad_Dias_Disponibles,
        UsrMod: '20291615490'
      });
      if (this.tomarAnioAnterior) {
        Swal.fire({
          title: '¡No puede tomar una licencia si posee días disponibles para el año anterior!',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        })
        this.terminaCarga();
        return;
      }
      this.service.updateLicencia(this.solicitudesLicenciaForm.getRawValue()).subscribe(datos => {
        if (datos[0].editar_licencia == null) {
          Swal.fire({
            title: '¡Se modificó la solicitud de licencia existente!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.dialogRef.close();
        }
        else {
          if (datos[0].editar_licencia == 'cantDias')
            Swal.fire({
              title: '¡No posee la cantidad de días disponibles suficiente para tramitar esta solicitud de licencia!',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          else
            Swal.fire({
              title: '¡Ocurrió un error al modificar la solicitud de licencia existente!',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
        }
        this.terminaCarga();
      });
    }
    else {
      Swal.fire({
        title: 'Verifique que los datos ingresados sean correctos y que todos los campos obligatorios estén llenos.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  addLicencia() {
    if (this.solicitudesLicenciaForm.valid) {
      this.cargando();
      this.solicitudesLicenciaForm.patchValue({
        CantDiasDisponibles: this.Cantidad_Dias_Disponibles,
        UsrIng: '20291615490'
      });
      if (this.tomarAnioAnterior) {
        Swal.fire({
          title: '¡No puede tomar una licencia si posee días disponibles para el año anterior!',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        })
        this.terminaCarga();
        return;
      }
      this.service.addLicencia(this.solicitudesLicenciaForm.getRawValue()).subscribe(datos => {
        if (datos[0].insertar_licencia == null) {
          Swal.fire({
            title: '¡Se generó la solicitud de licencia!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.dialogRef.close();
        }
        else {
          if (datos[0].insertar_licencia == 'cantDias')
            Swal.fire({
              title: '¡No posee la cantidad de días disponibles suficiente para tramitar esta solicitud de licencia!',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          else
            Swal.fire({
              title: '¡Ocurrió un error al generar la solicitud de licencia!',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
        }
        this.terminaCarga();
      });
    }
    else {
      Swal.fire({
        title: '¡Hay campos obligatorios sin completar!',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  onChangeComboTiposLicencias() {
    if (!this.soloLectura) {
      if (!this.solicitudesLicenciaForm.get('IdTipoLicencia')?.enabled)
        this.solicitudesLicenciaForm.get('IdTipoLicencia')?.enable();
      else
        if (this.solicitudesLicenciaForm.get('IdTipoLicencia')!.value)
          this.BuscarCantidadDiasLegajo();
    }
  }

  BuscarCantidadDiasLegajo() {
    this.tomarAnioAnterior = false;
    var idTipoLicencia = this.solicitudesLicenciaForm.controls['IdTipoLicencia'].value!;
    var idLegajo = this.solicitudesLicenciaForm.controls['IdLegajo'].value!;
    var anio = this.solicitudesLicenciaForm.controls['Anio'].value!;

    this.service.getCantidadDiasLegajo(idTipoLicencia, idLegajo, anio, this.idEditar).subscribe(datos => {
      if (datos[0].cantidad != null) {
        datos[0].cantidad_total = parseInt(datos[0].cantidad);
        datos[0].cantidad = parseInt(datos[0].cantidad) - parseInt(datos[0].cantidad_tomada);

        var Dias_Tomados = 0;
        this.Cantidad_Dias_Disponibles = datos[0].cantidad + this.Cantidad_Dias_Usados;
        Dias_Tomados = datos[0].cantidad_total - this.Cantidad_Dias_Disponibles;
        var Detalles = "Cantidad total de días: " + datos[0].cantidad_total + " - Tomados: " + Dias_Tomados + " - Disponibles: " + this.Cantidad_Dias_Disponibles;

        if (datos[0].usar_anio_siguiente == "S") {
          var Cant_ano_anterior = parseInt(datos[0].cantidad_ano_ant) - parseInt(datos[0].cantidad_tomada_ano_ant);
          if (Cant_ano_anterior > 0) {
            Detalles = "No puede seleccionar dias correspondientes al año " + anio + " ya que aun posee " + Cant_ano_anterior + " dias pendientes pertenecientes al año " + (anio - 1);
            this.tomarAnioAnterior = true;
            datos[0].cantidad = 0;
          }
        }
        if (datos[0].cantidad == 0)
          $('#MensajeCantidadE').html("<div class='alert alert-danger' role='alert'><strong>" + Detalles + ".</strong></div>");
        else
          $('#MensajeCantidadE').html("<div class='alert alert-info' role='alert'><strong>" + Detalles + ".</strong></div>");
      }
      else {
        Swal.fire({
          title: '¡Ocurrió un error al calcular los días disponibles!',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    });
  }
}
