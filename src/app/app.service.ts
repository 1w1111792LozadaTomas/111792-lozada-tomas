import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AppService {
  legajo_id = sessionStorage.getItem('legajo_id');

  constructor(private http: HttpClient) { }

  getNotificaciones(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetBuscarNotificaciones/${idLegajo}`);
  }

  SetNotificacionMarcarLeida(p_id_noti: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}SetNotificacionMarcarLeida/${p_id_noti}`);
  }

  SetNotificacionMarcarLeidaMasiva(p_legajo_id: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}SetNotificacionMarcarLeidaMasiva/${p_legajo_id}`);
  }

}
