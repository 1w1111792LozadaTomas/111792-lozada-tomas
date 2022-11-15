import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ModalReportesService {
  constructor(private http: HttpClient) { }

  GetRepLicenciasSolcitadasXAnio(p_legajo_id: string, p_anio: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetRepLicenciasSolcitadasXAnio/${p_legajo_id}/${p_anio}`);
  }

  GetRepLicenciasDiasDisponiblesXAnio(p_legajo_id: string, p_anio: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetRepLicenciasDiasDisponiblesXAnio/${p_legajo_id}/${p_anio}`);
  }

  GetRepAdelantosSolicitadoXAnio(p_legajo_id: string, p_anio: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetRepAdelantosSolicitadoXAnio/${p_legajo_id}/${p_anio}`);
  }

}
