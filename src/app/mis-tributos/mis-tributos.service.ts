import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisTributosService {
  constructor(private http: HttpClient) { }

  getMisTributos(idPersona: string,idJurisdiccion: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetMisTributos/${idPersona}/${idJurisdiccion}`);
  }
}
