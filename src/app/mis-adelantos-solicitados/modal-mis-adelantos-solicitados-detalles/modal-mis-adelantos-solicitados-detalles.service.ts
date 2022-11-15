import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisAdelantosSolicitadosDetallesService {
  constructor(private http: HttpClient) { }

  getAdelantosDetalles(vale_id: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetTraerAdelantoDetalles/${vale_id}`);
  }
}
