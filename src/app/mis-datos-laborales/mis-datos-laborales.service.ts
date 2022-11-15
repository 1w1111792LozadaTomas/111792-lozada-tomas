import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisDatosLaboralesService {
  constructor(private http: HttpClient) { }

  getMiLegajo(idUsuario: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMiLegajo/${idUsuario}`);
  }
}
