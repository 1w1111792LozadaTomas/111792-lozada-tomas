import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalGrupoFamiliarService } from './modal-grupo-familiar.service'
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

export interface DialogData {
  insertar: boolean;
  idEditar: any;
  soloLectura: any;
  nombreCompleto: any;
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './modal-grupo-familiar.component.html',
  providers: [ModalGrupoFamiliarService, SpinnerCargaComponent, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  styleUrls: ['./modal-grupo-familiar.component.scss']
})

export class ModalGrupoFamiliarComponent implements OnInit {

  legajo_id = sessionStorage.getItem('legajo_id');
  legajo_id_num = parseInt(this.legajo_id!);

  FamiliarForm = new FormGroup({
    IdGrupoFamiliar: new FormControl({ value: null, disabled: false }),
    LegajoId: new FormControl({ value: this.legajo_id_num!, disabled: false }),
    UsrIng: new FormControl({ value: '20291615490', disabled: false }),
    UsrMod: new FormControl({ value: '20291615490', disabled: false }),
    Nombre: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(50)]),
    Apellido: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.maxLength(50)]),
    IdTipoIdentificacion: new FormControl({ value: null, disabled: false }, [Validators.required]),
    NroDocumento: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8), Validators.maxLength(20)]),
    IdParentesco: new FormControl({ value: null, disabled: false }, [Validators.required]),
    Discapacitado: new FormControl(),
    Escolaridad: new FormControl({ value: null, disabled: false }),
    AdicionalObSocial: new FormControl(),
    FecNac: new FormControl({ value: null, disabled: false }, [Validators.required]),
    ACargo: new FormControl(),
    ArchivoPartida: new FormControl({ value: '', disabled: false }),
    NombreArchivoPartida: new FormControl({ value: '', disabled: false }),
    ArchivoDiscapacidad: new FormControl({ value: '', disabled: false }),
    NombreArchivoDiscapacidad: new FormControl({ value: '', disabled: false }),
    ArchivoEscolaridad: new FormControl({ value: '', disabled: false }),
    NombreArchivoEscolaridad: new FormControl({ value: '', disabled: false }),
  })

  insertar;
  idEditar;
  titulo;
  aniosList;
  ListadoTiposIdentificacion;
  ListadoParentescos;
  ListadoEscolaridades;
  botonDesactivado;
  activadoComboLicencias;
  Cantidad_Dias_Disponibles = 0;
  Cantidad_Dias_Usados = 0;
  discapacidad;
  adicionalObraSocial;
  nombreBoton;
  soloLectura;
  archivoPartida;
  nombreArchivoPartida;
  archivoDiscapacidad;
  nombreArchivoDiscapacidad;
  archivoEscolaridad;
  nombreArchivoEscolaridad;
  colorearBoton;

  constructor(public dialogRef: MatDialogRef<ModalGrupoFamiliarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ModalGrupoFamiliarService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.insertar, data.idEditar, data.nombreCompleto, data.soloLectura)
  }

  ngOnInit(): void {
    this.ListadoParentescos = [{ nombre: 'Esposo/a', id: 1 }, { nombre: 'Concubino', id: 2 }, { nombre: 'Padre', id: 3 }, { nombre: 'Madre', id: 4 }, { nombre: 'Hijo/a', id: 5 }, { nombre: 'Nieto/a', id: 6 }]
    this.ListadoEscolaridades = [{ nombre: 'Primaria', id: 1 }, { nombre: 'Secundaria', id: 2 }, { nombre: 'Universitaria', id: 3 }]
    this.service.getTiposIdentificacionListado().subscribe(datos => { this.ListadoTiposIdentificacion = datos; });
    this.FamiliarForm.controls['Escolaridad'].disable();
    this.FamiliarForm.controls['Discapacitado'].disable();
    this.FamiliarForm.controls['ACargo'].disable();
    this.FamiliarForm.controls['AdicionalObSocial'].disable();

    if (this.idEditar) {
      this.traerParaEditarFamiliar(this.idEditar);
      if (this.soloLectura) {
        this.FamiliarForm.controls['Nombre'].disable();
        this.FamiliarForm.controls['Apellido'].disable();
        this.FamiliarForm.controls['IdTipoIdentificacion'].disable();
        this.FamiliarForm.controls['NroDocumento'].disable();
        this.FamiliarForm.controls['IdParentesco'].disable();
        this.FamiliarForm.controls['Escolaridad'].disable();
        this.FamiliarForm.controls['FecNac'].disable();
        this.FamiliarForm.controls['Discapacitado'].disable();
        this.FamiliarForm.controls['AdicionalObSocial'].disable();
        this.FamiliarForm.controls['ACargo'].disable();
      }
    }
  }

  datos(insertar: boolean, idEditar: any, nombreCompleto: any, soloLectura: any): void {
    this.insertar = insertar;
    this.idEditar = idEditar;
    this.soloLectura = soloLectura;
    if (soloLectura)
      this.titulo = 'Ver datos de ' + nombreCompleto;
    else {
      insertar ? this.titulo = 'Registrar Nuevo Familiar' : this.titulo = 'Editar a ' + nombreCompleto;
      insertar ? this.nombreBoton = 'Agregar' : this.nombreBoton = 'Guardar Cambios';
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

  onFileChangePartida(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.name.split('.').pop() == 'pdf') {
          this.FamiliarForm.patchValue({
            ArchivoPartida: (reader.result as string).substring((reader.result as string).indexOf(',') + 1),
            NombreArchivoPartida: file.name
          });
          this.archivoPartida = this.FamiliarForm.get('ArchivoPartida')?.value;
          this.nombreArchivoPartida = this.FamiliarForm.get('NombreArchivoPartida')?.value;
          if (!this.FamiliarForm.get('ACargo')?.enabled)
            this.FamiliarForm.controls['ACargo'].enable();
          if (!this.FamiliarForm.get('AdicionalObSocial')?.enabled)
            this.FamiliarForm.controls['AdicionalObSocial'].enable();
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

  onFileChangeDiscapacidad(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.name.split('.').pop() == 'pdf') {
          this.FamiliarForm.patchValue({
            ArchivoDiscapacidad: (reader.result as string).substring((reader.result as string).indexOf(',') + 1),
            NombreArchivoDiscapacidad: file.name
          });
          this.archivoDiscapacidad = this.FamiliarForm.get('ArchivoDiscapacidad')?.value;
          this.nombreArchivoDiscapacidad = this.FamiliarForm.get('NombreArchivoDiscapacidad')?.value;
          if (!this.FamiliarForm.get('Discapacitado')?.enabled)
            this.FamiliarForm.controls['Discapacitado'].enable();
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

  onFileChangeEscolaridad(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (file.name.split('.').pop() == 'pdf') {
          this.FamiliarForm.patchValue({
            ArchivoEscolaridad: (reader.result as string).substring((reader.result as string).indexOf(',') + 1),
            NombreArchivoEscolaridad: file.name
          });
          this.archivoEscolaridad = this.FamiliarForm.get('ArchivoEscolaridad')?.value;
          this.nombreArchivoEscolaridad = this.FamiliarForm.get('NombreArchivoEscolaridad')?.value;
          if (!this.FamiliarForm.get('Escolaridad')?.enabled)
            this.FamiliarForm.controls['Escolaridad'].enable();
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

  traerParaEditarFamiliar(grupo_fam_id) {
    this.service.getTraerParaEditarFamiliar(grupo_fam_id).subscribe(datos => {
      let v_adicional_ob = datos[0].adicional_ob_social == 1 ? true : false;
      let v_discapacidad = datos[0].discapacitado == 1 ? true : false;
      let v_a_cargo = datos[0].a_cargo == 1 ? true : false;
      this.FamiliarForm.patchValue({
        IdGrupoFamiliar: this.idEditar,
        Nombre: datos[0].nombre,
        Apellido: datos[0].apellido,
        IdTipoIdentificacion: datos[0].id_tipo_identificacion,
        NroDocumento: datos[0].nro_documento,
        IdParentesco: datos[0].id_parentesco,
        FecNac: datos[0].fecha_nac,
        Discapacitado: v_discapacidad,
        Escolaridad: datos[0].escolaridad,
        AdicionalObSocial: v_adicional_ob,
        ACargo: v_a_cargo,
        ArchivoPartida: datos[0].archivo_partida,
        NombreArchivoPartida: datos[0].nombre_archivo_partida,
        ArchivoDiscapacidad: datos[0].archivo_discapacidad,
        NombreArchivoDiscapacidad: datos[0].nombre_archivo_discapacidad,
        ArchivoEscolaridad: datos[0].archivo_escolaridad,
        NombreArchivoEscolaridad: datos[0].nombre_archivo_escolaridad
      });
      this.archivoPartida = this.FamiliarForm.get('ArchivoPartida')?.value;
      this.nombreArchivoPartida = this.FamiliarForm.get('NombreArchivoPartida')?.value;
      this.archivoDiscapacidad = this.FamiliarForm.get('ArchivoDiscapacidad')?.value;
      this.nombreArchivoDiscapacidad = this.FamiliarForm.get('NombreArchivoDiscapacidad')?.value;
      this.archivoEscolaridad = this.FamiliarForm.get('ArchivoEscolaridad')?.value;
      this.nombreArchivoEscolaridad = this.FamiliarForm.get('NombreArchivoEscolaridad')?.value;

      this.FamiliarForm.controls['Discapacitado'].disable();
      this.FamiliarForm.controls['ACargo'].disable();
      this.FamiliarForm.controls['AdicionalObSocial'].disable();
      if (!this.soloLectura) {
        !this.archivoPartida ? this.FamiliarForm.controls['ACargo'].disable() : this.FamiliarForm.controls['ACargo'].enable();
        !this.archivoPartida ? this.FamiliarForm.controls['AdicionalObSocial'].disable() : this.FamiliarForm.controls['AdicionalObSocial'].enable();
        !this.archivoDiscapacidad ? this.FamiliarForm.controls['Discapacitado'].disable() : this.FamiliarForm.controls['Discapacitado'].enable();
        !this.archivoEscolaridad ? this.FamiliarForm.controls['Escolaridad'].disable() : this.FamiliarForm.controls['Escolaridad'].enable();
      }
    });
  }

  submitFormulario() {
    this.insertar ? this.addFamiliar() : this.updateFamiliar();
  }

  updateFamiliar() {
    if (this.FamiliarForm.valid) {
      this.cargando();
      this.service.updateFamiliar(this.FamiliarForm.getRawValue()).subscribe(datos => {
        if (datos[0].insertar_familiar == null) {
          Swal.fire({
            title: '¡Se modificó al familiar existente!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.dialogRef.close();
        }
        else {
          Swal.fire({
            title: '¡Ocurrió un error al modificar al familiar existente!',
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

  addFamiliar() {
    if (this.FamiliarForm.valid) {
      this.cargando();
      this.service.addFamiliar(this.FamiliarForm.getRawValue()).subscribe(datos => {
        if (datos[0].insertar_familiar == null) {
          Swal.fire({
            title: '¡Se registró al nuevo familiar!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.dialogRef.close();
        }
        else {
          Swal.fire({
            title: '¡Ocurrió un error al registrar al nuevo familiar!',
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
