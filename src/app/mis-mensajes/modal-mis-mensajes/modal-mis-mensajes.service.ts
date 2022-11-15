import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from ".././../../environments/environment";
import { Observable } from "rxjs";
import { InsertarMensajeDTO } from './models/Mensaje'
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ModalMisMensajesService {
  constructor(private http: HttpClient) { }

  getLegajosDestinatarios(p_legajo_id: any): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetLegajosDestinatarios/${p_legajo_id}`);
  }

  getTraerParaEditarMensaje(p_id_bandeja_mensaje: any, p_legajo_id: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTraerParaEditarMensaje/${p_id_bandeja_mensaje}/${p_legajo_id}`);
  }

  getTraerOriginal(p_id_bandeja_mensaje: any): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTraerOriginal/${p_id_bandeja_mensaje}`);
  }

  addMensaje(data: InsertarMensajeDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/AddMensaje`, data);
  }

  addMensajeRespuesta(data: InsertarMensajeDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/AddMensajeRespuesta`, data);
  }
}

