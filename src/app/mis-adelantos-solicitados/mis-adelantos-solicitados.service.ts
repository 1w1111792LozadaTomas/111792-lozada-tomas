import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisAdelantosSolicitadosService {
  constructor(private http: HttpClient) { }

  getAdelantosSolicitados(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMisAdelantos/${idLegajo}`);
  }

  deleteAdelanto(id_vale: number, user_baja: string) {
    var data = { IdVale: id_vale, UserBaja: user_baja };
    return this.http.post<any>(`${environment.urlService}/DeleteAdelanto`, data);
  }
}
