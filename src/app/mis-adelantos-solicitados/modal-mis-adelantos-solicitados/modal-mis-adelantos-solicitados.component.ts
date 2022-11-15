import { Component, OnInit, Inject, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalMisAdelantosSolicitadosService } from './modal-mis-adelantos-solicitados.service'
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
  idEditar: any;
  nroAdelanto: string;
}

@Component({
  selector: 'app-dialog-example',
  templateUrl: './modal-mis-adelantos-solicitados.component.html',
  providers: [ModalMisAdelantosSolicitadosService, SpinnerCargaComponent, { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  styleUrls: ['./modal-mis-adelantos-solicitados.component.scss']
})

export class ModalMisAdelantosSolicitados implements OnInit {

  legajo_id = sessionStorage.getItem('legajo_id');
  legajo_id_num = parseInt(this.legajo_id!);

  AdelantosForm = new FormGroup({
    IdVale: new FormControl({ value: null, disabled: false }),
    IdLegajo: new FormControl({ value: this.legajo_id_num!, disabled: false }),
    Cuotas: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(3), Validators.min(1)]),
    Anio: new FormControl({ value: null, disabled: false }, [Validators.required]),
    Concepto: new FormControl({ value: null, disabled: false }, [Validators.required]),
    IdTipoLiquidacion: new FormControl({ value: null, disabled: false }, [Validators.required]),
    Monto: new FormControl({ value: null, disabled: false }, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(20), Validators.min(1)]),
    UsrIng: new FormControl({ value: '20291615490', disabled: false }, [Validators.required]),
    UsrMod: new FormControl({ value: '20291615490', disabled: false }, [Validators.required]),
    PeriodoId: new FormControl({ value: null, disabled: false }, [Validators.required])
  })

  insertar;
  idEditar;
  titulo;
  srcResult;
  ListadoTiposLiquidacion;
  ListadoPeriodos;
  ListadoAnios;
  botonDesactivado;
  nombreBoton;
  anioSeleccionado;
  anioActual;
  mesActual;
  ListadoCuotas;

  constructor(public dialogRef: MatDialogRef<ModalMisAdelantosSolicitados>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private service: ModalMisAdelantosSolicitadosService,
    public spinner: SpinnerCargaComponent) {
    this.datos(data.insertar, data.idEditar, data.nroAdelanto)
  }

  ngOnInit(): void {
    this.anioActual = new Date().getFullYear();
    this.mesActual = new Date().getMonth() + 1;
    console.log(this.mesActual)
    this.ListadoCuotas = [1,2,3,4,5,6];
    this.ListadoAnios = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    this.service.getTiposLiquidacion().subscribe(datos => { this.ListadoTiposLiquidacion = datos; });
    if (this.idEditar) {
      this.traerParaEditarAdelanto(this.idEditar);
    }
  }

  datos(insertar: boolean, idEditar: any, nroAdelanto: string): void {
    this.insertar = insertar;
    this.idEditar = idEditar;
    insertar ? this.titulo = 'Nueva Solicitud de Adelanto' : this.titulo = 'Editar Solicitud de Adelanto Número: ' + nroAdelanto;
    insertar ? this.nombreBoton = 'Agregar' : this.nombreBoton = 'Guardar Cambios';
  }

  cargando() {
    this.botonDesactivado = true;
    this.spinner.cargarSpinner();
  }

  terminaCarga() {
    this.botonDesactivado = false;
    this.spinner.sacarSpinner();
  }

  getPeriodos() {
    this.anioSeleccionado = this.AdelantosForm.get("Anio")!.value!;
    this.AdelantosForm.patchValue({
      PeriodoId: null
    });
    this.service.getPeriodos(this.AdelantosForm.get("Anio")!.value!).subscribe(datos => {
      this.ListadoPeriodos = datos;
    });
  }

  getTiposLiquidacion() {
    this.service.getTiposLiquidacion().subscribe(datos => {
      this.ListadoTiposLiquidacion = datos;
    });
  }

  traerParaEditarAdelanto(id_vale) {
    this.service.getTraerParaEditarAdelanto(id_vale).subscribe(datos => {
      this.AdelantosForm.patchValue({
        IdVale: this.idEditar,
        IdTipoLiquidacion: datos[0].idtipoliquidacion,
        Concepto: datos[0].concepto,
        Cuotas: datos[0].cuotas,
        Monto: datos[0].monto,
        Anio: datos[0].anio,
        PeriodoId: datos[0].periodoid
      });
    });
  }

  submitFormulario() {
    this.insertar ? this.addAdelanto() : this.updateAdelanto();
  }

  updateAdelanto() {
    if (this.AdelantosForm.valid) {
      this.cargando();
      this.service.updateAdelanto(this.AdelantosForm.getRawValue()).subscribe(datos => {
        if (datos[0].editar_vale == null) {
          Swal.fire({
            title: '¡Se modificó la solicitud de adelanto existente!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.dialogRef.close();
        }
        else {
          if (datos[0].editar_vale.startsWith('MontoSuperado')) {
            Swal.fire({
              title: 'El monto solicitado para este año no puede superar el valor: ' + datos[0].editar_vale.replace('MontoSuperado ', ''),
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            })
          }
          else
            Swal.fire({
              title: '¡Ocurrió un error al modificar la solicitud de adelanto existente!',
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

  addAdelanto() {
    if (this.AdelantosForm.valid) {
      this.cargando();
      this.service.addAdelanto(this.AdelantosForm.getRawValue()).subscribe(datos => {
        if (datos[0].insertar_vale == null) {
          Swal.fire({
            title: '¡Se generó la solicitud de adelanto!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.dialogRef.close();
        }
        else {
          if (datos[0].insertar_vale.startsWith('MontoSuperado')) {
            Swal.fire({
              title: 'El monto solicitado para este año no puede superar el valor: ' + datos[0].insertar_vale.replace('MontoSuperado ', ''),
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            })
          }
          else
            if (datos[0].insertar_vale.startsWith('HayAdelanto')) {
              Swal.fire({
                title: 'No puede solicitar más de un adelanto a la vez, Anule la solicitud existente para poder generar otra.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
              })
            }
            else
              Swal.fire({
                title: '¡Ocurrió un error al generar la solicitud de adelanto!',
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
