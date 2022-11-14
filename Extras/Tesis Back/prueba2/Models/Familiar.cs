using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace prueba2.Models
{
    public class Familiar
    {
        public Familiar()
        {
        }

        public Familiar(int idGrupoFamiliar, int legajoId, int idParentesco, bool discapacitado, int escolaridad, DateTime fechaBajaEsc, bool adicionalObSocial, string usrIng, DateTime fecIng, string usrMod, DateTime fecMod, string userBaja, DateTime fechaBaja, bool aCargo, DateTime fecNac, int ingresoBruto, int idTipoIdentificacion, string nroDocumento, string nombre, string apellido, string fondoEnfCatastroficas, string fallecido, string archivoPartida, string nombreArchivoPartida, string archivoDiscapacidad, string nombreArchivoDiscapacidad, string archivoEscolaridad, string nombreArchivoEscolaridad)
        {
            IdGrupoFamiliar = idGrupoFamiliar;
            LegajoId = legajoId;
            IdParentesco = idParentesco;
            Discapacitado = discapacitado;
            Escolaridad = escolaridad;
            FechaBajaEsc = fechaBajaEsc;
            AdicionalObSocial = adicionalObSocial;
            UsrIng = usrIng;
            FecIng = fecIng;
            UsrMod = usrMod;
            FecMod = fecMod;
            UserBaja = userBaja;
            FechaBaja = fechaBaja;
            ACargo = aCargo;
            FecNac = fecNac;
            IngresoBruto = ingresoBruto;
            IdTipoIdentificacion = idTipoIdentificacion;
            NroDocumento = nroDocumento;
            Nombre = nombre;
            Apellido = apellido;
            FondoEnfCatastroficas = fondoEnfCatastroficas;
            Fallecido = fallecido;
            ArchivoPartida = archivoPartida;
            NombreArchivoPartida = nombreArchivoPartida;
            ArchivoDiscapacidad = archivoDiscapacidad;
            NombreArchivoDiscapacidad = nombreArchivoDiscapacidad;
            ArchivoEscolaridad = archivoEscolaridad;
            NombreArchivoEscolaridad = nombreArchivoEscolaridad;
        }

        public int IdGrupoFamiliar { get; set; }
        public int LegajoId { get; set; }
        public int IdParentesco { get; set; }
        public Boolean Discapacitado { get; set; }
        public int Escolaridad { get; set; }
        public DateTime FechaBajaEsc { get; set; }
        public Boolean AdicionalObSocial { get; set; }
        public String UsrIng { get; set; }
        public DateTime FecIng { get; set; }
        public String UsrMod { get; set; }
        public DateTime FecMod { get; set; }
        public String UserBaja { get; set; }
        public DateTime FechaBaja { get; set; }
        public Boolean ACargo { get; set; }
        public DateTime FecNac { get; set; }
        public int IngresoBruto { get; set; }
        public int IdTipoIdentificacion { get; set; }
        public String NroDocumento { get; set; }
        public String Nombre { get; set; }
        public String Apellido { get; set; }
        public String FondoEnfCatastroficas { get; set; }
        public String Fallecido { get; set; }
        public String ArchivoPartida { get; set; }
        public String NombreArchivoPartida { get; set; }
        public String ArchivoDiscapacidad { get; set; }
        public String NombreArchivoDiscapacidad { get; set; }
        public String ArchivoEscolaridad { get; set; }
        public String NombreArchivoEscolaridad { get; set; }
    }
}