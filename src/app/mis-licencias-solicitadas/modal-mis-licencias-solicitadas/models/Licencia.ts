export class InsertarLicenciaDTO {
  IdLicencia: number | null;
  IdLegajo: number | null;
  IdTipoLicencia: number | null;
  FecInicio: Date | null;
  FecFin: Date | null;
  UsrIng: string | null;
  UsrMod: string | null;
  Detalles: string | null;;
  Anio: number | null;
  CantDiasDisponibles: number | null;
  constructor() { }
}
