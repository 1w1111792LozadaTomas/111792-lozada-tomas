using System;

namespace prueba2.Models
{
    public class EliminarLicenciaDto
    {
        public EliminarLicenciaDto()
        {
        }

        public EliminarLicenciaDto(int idLicencia, string userBaja)
        {
            IdLicencia = idLicencia;
            UserBaja = userBaja;
        }

        public int IdLicencia { get; set; }
        public String UserBaja { get; set; }

    }
}