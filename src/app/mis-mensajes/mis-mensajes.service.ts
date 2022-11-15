import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisMensajesService {
  constructor(private http: HttpClient) { }

  getMisMensajes(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMisMensajes/${idLegajo}`);
  }

  getMisRespuestas(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMisRespuestas/${idLegajo}`);
  }

  getMisMensajesBaja(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMisMensajesBaja/${idLegajo}`);
  }

  getMisMensajesFavoritos(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetBuscarMensajesFavoritos/${idLegajo}`);
  }

  sendMensajesAPapelera(p_mensajes_a_papelera: number[], p_legajo_id: string, p_estado_a_pasar: boolean): Observable<any> {
    return this.http.get<any>(`${environment.urlService}SendMensajesAPapelera/${p_mensajes_a_papelera}/${p_legajo_id}/${p_estado_a_pasar}`);
  }

  SendMensajesPasarLeido(p_mensajes_pasar_leido: number[], p_legajo_id: string, p_estado_a_pasar: boolean): Observable<any> {
    return this.http.get<any>(`${environment.urlService}SendMensajesPasarLeido/${p_mensajes_pasar_leido}/${p_legajo_id}/${p_estado_a_pasar}`);
  }

  SendEliminarMensajesPapelera(p_mensajes_papelera: number[], p_legajo_id: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}SendEliminarMensajesPapelera/${p_mensajes_papelera}/${p_legajo_id}`);
  }

  SendMensajesPasarAFavoritos(p_mensajes_pasar_favoritos: number[], p_legajo_id: string, p_estado_a_pasar: boolean): Observable<any> {
    return this.http.get<any>(`${environment.urlService}SendMensajesPasarAFavoritos/${p_mensajes_pasar_favoritos}/${p_legajo_id}/${p_estado_a_pasar}`);
  }
}
