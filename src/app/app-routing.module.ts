import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisDatosLaboralesComponent } from './mis-datos-laborales/mis-datos-laborales.component';
import { MisLicenciasSolicitadasComponent } from './mis-licencias-solicitadas/mis-licencias-solicitadas.component';
import { MisAdelantosSolicitadosComponent } from './mis-adelantos-solicitados/mis-adelantos-solicitados.component';
import { MiFamiliaComponent } from './mi-familia/mi-familia.component';
import { MisTributosComponent } from './mis-tributos/mis-tributos.component';
import { MisMensajesComponent } from './mis-mensajes/mis-mensajes.component';
import { MisRecibosDeSueldoComponent } from './mis-recibos-de-sueldo/mis-recibos-de-sueldo.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CambiaEstadosComponent } from './cambia-estados/cambia-estados.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { TerminosYCondicionesComponent } from './terminos-ycondiciones/terminos-ycondiciones.component';

const routes: Routes = [
  { path: 'misDatosLaborales', component: MisDatosLaboralesComponent },
  { path: 'misLicenciasSolicitadas', component: MisLicenciasSolicitadasComponent },
  { path: 'misAdelantosSolicitados', component: MisAdelantosSolicitadosComponent },
  { path: 'miFamilia', component: MiFamiliaComponent },
  { path: 'misTributos', component: MisTributosComponent },
  { path: 'misMensajes', component: MisMensajesComponent },
  { path: 'misRecibosDeSueldo', component: MisRecibosDeSueldoComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'estados', component: CambiaEstadosComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'terminosYCondiciones', component: TerminosYCondicionesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [MisDatosLaboralesComponent, MisLicenciasSolicitadasComponent, MisAdelantosSolicitadosComponent, MiFamiliaComponent, MisTributosComponent, MisMensajesComponent, MisRecibosDeSueldoComponent, ReportesComponent, CambiaEstadosComponent, NotificacionesComponent,TerminosYCondicionesComponent]
