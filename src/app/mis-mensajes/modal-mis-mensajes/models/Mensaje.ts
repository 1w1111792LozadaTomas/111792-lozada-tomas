export class InsertarMensajeDTO {
  IdBandejaMensaje: number | null;
  IdLegajo: string | null;
  IdLegajoDestinatario: number | null;
  Asunto: string | null;
  Mensaje1: string | null;
  Archivo: string | null;
  NombreArchivo: string | null;
  constructor() { }
}
