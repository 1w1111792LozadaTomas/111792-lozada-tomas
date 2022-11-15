import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { Observable } from "rxjs";
import { InsertarLicenciaDTO } from "./models/Licencia"

@Injectable({
  providedIn: "root",
})
export class MisLicenciasSolicitadasService {
  constructor(private http: HttpClient) { }

  getTiposLicenciaListado(idJurisdiccion: number): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTiposLicenciaListado/${idJurisdiccion}`);
  }

  addLicencia(data: InsertarLicenciaDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/AddLicencia`, data);
  }

  updateLicencia(data: InsertarLicenciaDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/UpdateLicencia`, data);
  }

  getCantidadDiasLegajo(idTipoLicencia: any, idLegajo: any, anio: any, licenciaId: any): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetCantidadDiasLegajo/${idTipoLicencia}/${idLegajo}/${anio}/${licenciaId}`);
  }

  getTraerParaEditarLicencia(licencia_id: number): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTraerParaEditarLicencia/${licencia_id}`);
  }

  SetCambiaEstadoLicencia(p_licencia_id: number, p_estado: number, p_legajo_id: number): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/SetCambiaEstadoLicencia/${p_licencia_id}/${p_estado}/${p_legajo_id}`);
  }
}
