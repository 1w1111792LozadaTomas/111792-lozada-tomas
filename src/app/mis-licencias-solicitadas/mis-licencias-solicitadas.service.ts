import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisLicenciasSolicitadasService {
  constructor(private http: HttpClient) { }

  getLicenciasSolicitadas(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetLicenciasSolicitadas/${idLegajo}`);
  }

  deleteLicencia(licencia_id: number, user_baja: string) {
    var data = { IdLicencia: licencia_id, UserBaja: user_baja };
    return this.http.post<any>(`${environment.urlService}/DeleteLicencia`, data);
  }
}
