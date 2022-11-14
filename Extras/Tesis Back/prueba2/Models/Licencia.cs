using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace prueba2.Models
{
    public class Licencia
    {
        public Licencia()
        {
        }

        public int IdLicencia { get; set; }
        public int IdLegajo { get; set; }
        public int Anio { get; set; }
        public int IdTipoLicencia { get; set; }
        public DateTime FecInicio { get; set; }
        public DateTime FecFin { get; set; }
        public String UsrIng { get; set; }
        public String UsrMod { get; set; }
        public String Detalles { get; set; }
        public int CantDiasDisponibles { get; set; }
        public String NombreArchivo { get; set; }
        public String Archivo { get; set; }

    }
}