using System;

namespace prueba2.Models
{
    public class EliminarAdelantoDto
    {
        public EliminarAdelantoDto()
        {
        }

        public EliminarAdelantoDto(int idVale, string userBaja)
        {
            IdVale = idVale;
            UserBaja = userBaja;
        }

        public int IdVale { get; set; }
        public String UserBaja { get; set; }

    }
}