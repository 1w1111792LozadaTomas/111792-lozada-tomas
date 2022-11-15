import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CambiaEstadosService {
  constructor(private http: HttpClient) { }

  getLicenciasSolicitadas(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetLicenciasSolicitadas/${idLegajo}`);
  }

  getAdelantosSolicitados(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMisAdelantos/${idLegajo}`);
  }

}
