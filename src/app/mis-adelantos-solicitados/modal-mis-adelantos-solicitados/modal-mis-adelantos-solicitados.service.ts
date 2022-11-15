import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from ".././../../environments/environment";
import { Observable } from "rxjs";
import { InsertarAdelantoDTO } from "../modal-mis-adelantos-solicitados/models/AdelantoModel";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ModalMisAdelantosSolicitadosService {
  constructor(private http: HttpClient) { }

  getPeriodos(anio: number): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetPeriodos/${anio}`);
  }

  getTiposLiquidacion(): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTiposLiquidacion`);
  }

  getTraerParaEditarAdelanto(id_vale: number): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTraerParaEditarAdelanto/${id_vale}`);
  }

  addAdelanto(data: InsertarAdelantoDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/AddAdelanto`, data);
  }

  updateAdelanto(data: InsertarAdelantoDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/UpdateAdelanto`, data);
  }

  SetCambiaEstadoAdelanto(p_vale_id: number, p_estado: number, p_legajo_id: number): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/SetCambiaEstadoAdelanto/${p_vale_id}/${p_estado}/${p_legajo_id}`);
  }

}

