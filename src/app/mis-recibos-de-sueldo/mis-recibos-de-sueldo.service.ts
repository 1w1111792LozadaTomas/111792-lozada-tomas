import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisRecibosSueldoService {
  constructor(private http: HttpClient) { }

  getMisRecibosSueldo(idUsuario, anio): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMisRecibosSueldo/${idUsuario}/${anio}`);
  }

  updateMisRecibosSueldo(archivo): Observable<any> {
    var data = { archivo: archivo }
    return this.http.post<any>(`${environment.urlService}UpdateMisRecibos`, data);
  }
}
