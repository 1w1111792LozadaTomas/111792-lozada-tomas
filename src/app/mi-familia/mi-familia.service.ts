import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class MisFamiliaService {
  constructor(private http: HttpClient) { }

  getGrupoFamiliar(idLegajo: string): Observable<any> {
    return this.http.get<any>(`${environment.urlService}GetGrupoFamiliar/${idLegajo}`);
  }

  deleteFamiliar(grupo_familiar_id: number,user_baja:any){
    let data= {'IdGrupoFamiliar':grupo_familiar_id,'UserBaja':user_baja}
    return this.http.post<any>(`${environment.urlService}/DeleteFamiliar`,data);
  }
}
