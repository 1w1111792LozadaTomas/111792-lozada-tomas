using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace prueba2.Models
{
    public class Recibo
    {
        public Recibo()
        {
        }

        public Recibo(string archivo)
        {
            Archivo = archivo;
        }

        public String Archivo { get; set; }
    }
}