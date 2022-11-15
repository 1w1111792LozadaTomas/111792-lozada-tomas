import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class NotificacionesService {
  constructor(private http: HttpClient) { }

  GetBuscarMisNotificaciones(p_legajo_id: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetBuscarMisNotificaciones/${p_legajo_id}`);
  }
}
