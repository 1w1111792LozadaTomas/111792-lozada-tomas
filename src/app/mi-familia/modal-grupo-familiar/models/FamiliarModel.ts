export class InsertarFamiliarDTO {
  LegajoId: number | null;
  IdParentesco: number | null;
  Discapacitado: boolean;
  Escolaridad: number | null;
  AdicionalObSocial: boolean;
  UsrIng: string | null;
  ACargo: boolean;
  FecNac: Date | null;
  IdTipoIdentificacion: number | null;
  NroDocumento: number | null;
  Nombre: string | null;
  Apellido: string | null;
  ArchivoPartida: string | null;
  NombreArchivoPartida: string | null;
  ArchivoDiscapacidad: string | null;
  NombreArchivoDiscapacidad: string | null;
  ArchivoEscolaridad: string | null;
  NombreArchivoEscolaridad: string | null;
  constructor() { }
}
