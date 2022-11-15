import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from ".././../../environments/environment";
import { Observable } from "rxjs";
import { InsertarFamiliarDTO } from ".././modal-grupo-familiar/models/FamiliarModel";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ModalGrupoFamiliarService {
  constructor(private http: HttpClient) { }

  getTiposIdentificacionListado(): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTiposIdentificacionListado`);
  }

  addFamiliar(data: InsertarFamiliarDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/AddFamiliar`, data);
  }

  updateFamiliar(data: InsertarFamiliarDTO): Observable<any> {
    return this.http.post<any>(`${environment.urlService}/updateFamiliar`, data);
  }

  getTraerParaEditarFamiliar(grupo_familiar_id: number): Observable<any> {
    return this.http.get<any>(`${environment.urlService}/GetTraerParaEditarFamiliar/${grupo_familiar_id}`);
  }
}

