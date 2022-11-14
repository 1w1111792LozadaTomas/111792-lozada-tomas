using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace prueba2.Models
{
    public class Mensaje
    {
        public Mensaje()
        {
        }

        public Mensaje(int idBandejaMensaje, int idLegajo, int idLegajoDestinatario, string asunto, string mensaje1, string archivo, string nombreArchivo)
        {
            IdBandejaMensaje = idBandejaMensaje;
            IdLegajo = idLegajo;
            IdLegajoDestinatario = idLegajoDestinatario;
            Asunto = asunto;
            Mensaje1 = mensaje1;
            Archivo = archivo;
            NombreArchivo = nombreArchivo;
        }

        public int IdBandejaMensaje { get; set; }
        public int IdLegajo { get; set; }
        public int IdLegajoDestinatario { get; set; }
        public String Asunto { get; set; }
        public String Mensaje1 { get; set; }
        public String Archivo { get; set; }
        public String NombreArchivo { get; set; }
    }
}