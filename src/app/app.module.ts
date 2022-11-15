import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SpinnerCargaComponent } from './utilidades/spinner-carga/spinner-carga.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModalGrupoFamiliarComponent } from './mi-familia/modal-grupo-familiar/modal-grupo-familiar.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ModalMisAdelantosSolicitados } from './mis-adelantos-solicitados/modal-mis-adelantos-solicitados/modal-mis-adelantos-solicitados.component';
import { ModalMisAdelantosSolicitadosDetallesComponent } from './mis-adelantos-solicitados/modal-mis-adelantos-solicitados-detalles/modal-mis-adelantos-solicitados-detalles.component';
import { ModalMisLicenciasSolicitadasComponent } from './mis-licencias-solicitadas/modal-mis-licencias-solicitadas/modal-mis-licencias-solicitadas.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ModalMisMensajesComponent } from './mis-mensajes/modal-mis-mensajes/modal-mis-mensajes.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ModalReportesComponent } from './reportes/modal-reportes/modal-reportes.component';
import { ModalCambiaEstadosLicenciaComponent } from './cambia-estados/modal-cambia-estados-licencia/modal-cambia-estados-licencia.component';
import { ModalCambiaEstadosAdelantosComponent } from './cambia-estados/modal-cambia-estados-adelantos/modal-cambia-estados-adelantos.component';
import { ModalPreguntasComponent } from './terminos-ycondiciones/modal-preguntas/modal-preguntas.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SpinnerCargaComponent,
    ModalGrupoFamiliarComponent,
    ModalMisAdelantosSolicitados,
    ModalMisAdelantosSolicitadosDetallesComponent,
    ModalMisLicenciasSolicitadasComponent,
    ModalMisMensajesComponent,
    ModalReportesComponent,
    ModalCambiaEstadosLicenciaComponent,
    ModalCambiaEstadosAdelantosComponent,
    ModalPreguntasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MomentDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule
  ],
  exports: [MatDialogModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  opened = false;
}
