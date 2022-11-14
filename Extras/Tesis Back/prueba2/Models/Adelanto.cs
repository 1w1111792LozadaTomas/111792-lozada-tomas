using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace prueba2.Models
{
    public class Adelanto
    {
        public Adelanto()
        {
        }

        public Adelanto(int idVale, int idLegajo, int cuotas, int anio, String concepto, double monto, String usrIng, String usrMod, int idTipoLiquidacion, int periodoId)
        {
            IdVale = idVale;
            IdLegajo = idLegajo;
            Cuotas = cuotas;
            Anio = anio;
            Concepto = concepto;
            Monto = monto;
            UsrIng = usrIng;
            UsrMod = usrMod;
            IdTipoLiquidacion = idTipoLiquidacion;
            PeriodoId = periodoId;
        }

        public int IdVale { get; set; }
        public int IdLegajo { get; set; }
        public int Cuotas { get; set; }
        public int Anio { get; set; }
        public String Concepto { get; set; }
        public double Monto { get; set; }
        public String UsrIng { get; set; }
        public String UsrMod { get; set; }
        public int IdTipoLiquidacion { get; set; }
        public int PeriodoId { get; set; }

    }
}