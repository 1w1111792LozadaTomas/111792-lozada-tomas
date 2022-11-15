import { Component, OnInit } from '@angular/core';
import { MisDatosLaboralesService } from './mis-datos-laborales.service';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SpinnerCargaComponent } from '../utilidades/spinner-carga/spinner-carga.component'

@Component({
  selector: 'app-mis-datos-laborales',
  templateUrl: './mis-datos-laborales.component.html',
  providers: [MisDatosLaboralesService, DatePipe, SpinnerCargaComponent],
  styleUrls: ['./mis-datos-laborales.component.scss']
})
export class MisDatosLaboralesComponent implements OnInit {

  usuario_id = sessionStorage.getItem('usuario_id');

  misDatosLaboralesForm = new FormGroup({
    fechaIngreso: new FormControl({ value: '', disabled: true }),
    fechaAntiguedad: new FormControl({ value: '', disabled: true }),
    area: new FormControl({ value: '', disabled: true }),
    categoria: new FormControl({ value: '', disabled: true }),
    sueldo: new FormControl({ value: '', disabled: true }),
    fechaEscalafon: new FormControl({ value: '', disabled: true }),
    estado: new FormControl({ value: '', disabled: true }),
    situacionRevista: new FormControl({ value: '', disabled: true }),
    direccion: new FormControl({ value: '', disabled: true })
  })

  nombreCompletoUsuario;
  legajoUsuario;
  datosCargados;

  constructor(
    private service: MisDatosLaboralesService,
    public datepipe: DatePipe,
    public spinner: SpinnerCargaComponent) { }

  ngOnInit(): void {
    this.traerMiLegajo();
  }

  LlenarMisDatosPersonales(datos) {
    //LLENA EL MODAL DE MIS DATOS LABORALES.
    var usuario = datos[0];
    if (usuario.fecha_ingreso1 != null)
      this.misDatosLaboralesForm.get('fechaIngreso')?.setValue(usuario.fecha_ingreso1);
    else this.misDatosLaboralesForm.get('fechaIngreso')?.setValue("S/D");
    if (usuario.fecha_antiguedad1 != null)
      this.misDatosLaboralesForm.get('fechaAntiguedad')?.setValue(usuario.fecha_antiguedad1);
    else this.misDatosLaboralesForm.get('fechaAntiguedad')?.setValue("S/D");
    if (usuario.area != null)
      this.misDatosLaboralesForm.get('area')?.setValue(usuario.area);
    else this.misDatosLaboralesForm.get('area')?.setValue("S/D");
    if (usuario.sueldo != null)
      this.misDatosLaboralesForm.get('categoria')?.setValue(usuario.nombre_categ)
    else this.misDatosLaboralesForm.get('categoria')?.setValue("S/D");
    if (usuario.sueldo != null)
      this.misDatosLaboralesForm.get('sueldo')?.setValue(usuario.sueldo)
    else this.misDatosLaboralesForm.get('sueldo')?.setValue("S/D");
    if (usuario.fecha_escalafon != null)
      this.misDatosLaboralesForm.get('fechaEscalafon')?.setValue(this.datepipe.transform(usuario.fecha_escalafon, 'dd-MM-yyyy'));
    else this.misDatosLaboralesForm.get('fechaEscalafon')?.setValue("S/D");
    if (usuario.estado1 != null)
      this.misDatosLaboralesForm.get('estado')?.setValue(usuario.estado1);
    else this.misDatosLaboralesForm.get('estado')?.setValue("S/D");
    if (usuario.nombre_contrato != null)
      this.misDatosLaboralesForm.get('situacionRevista')?.setValue(usuario.nombre_contrato);
    else this.misDatosLaboralesForm.get('situacionRevista')?.setValue("S/D");
    if (usuario.direccion != null)
      this.misDatosLaboralesForm.get('direccion')?.setValue(usuario.direccion);
    else this.misDatosLaboralesForm.get('direccion')?.setValue("S/D");
  }

  traerMiLegajo() {
    this.spinner.cargarSpinner();
    this.service.getMiLegajo(this.usuario_id!).subscribe(datos => {
      this.datosCargados = false;
      this.LlenarMisDatosPersonales(datos);
      this.nombreCompletoUsuario = datos[0].apellidonombre;
      this.legajoUsuario = datos[0].legajo_id;
      this.spinner.sacarSpinner();
      this.datosCargados = true;
    });
  }
}
