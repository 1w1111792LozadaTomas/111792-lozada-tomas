using System;

namespace prueba2.Models
{
    public class EliminarFamiliarDto
    {
        public EliminarFamiliarDto()
        {
        }

        public EliminarFamiliarDto(int idVale, string userBaja)
        {
            IdGrupoFamiliar = idVale;
            UserBaja = userBaja;
        }

        public int IdGrupoFamiliar { get; set; }
        public String UserBaja { get; set; }

    }
}