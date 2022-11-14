using Npgsql;
using NpgsqlTypes;
using prueba2.Models;
using System;
using System.Configuration;
using System.Data;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Mail;
using System.Web.Http;

namespace prueba2.Controllers
{
    [RoutePrefix("api/MiLegajo")]
    public class MiLegajoController : ApiController
    {
        protected HttpResponseMessage RetornarOK(object valor)
        {
            var http = new HttpResponseMessage();

            if (valor != null)
                http.Content = new ObjectContent(valor.GetType(), valor, new JsonMediaTypeFormatter());
            http.StatusCode = System.Net.HttpStatusCode.OK;

            return http;
        }

        // GET api/values
        [Route("GetMiLegajo/{idUsuario}")]
        [HttpGet]
        public HttpResponseMessage GetMiLegajo(int idUsuario)
        {
            var resultado = BuscarMiLegajo(idUsuario);

            return RetornarOK(resultado);
        }

        [Route("GetLicenciasSolicitadas/{idLegajo}")]
        [HttpGet]
        public HttpResponseMessage GetLicenciasSolicitadas(int idLegajo)
        {
            var resultado = BuscarLicenciasSolicitadas(idLegajo);

            return RetornarOK(resultado);
        }

        [Route("GetMisAdelantos/{idLegajo}")]
        [HttpGet]
        public HttpResponseMessage GetMisAdelantos(int idLegajo)
        {
            var resultado = BuscarMisAdelantos(idLegajo);

            return RetornarOK(resultado);
        }

        [Route("GetGrupoFamiliar/{idLegajo}")]
        [HttpGet]
        public HttpResponseMessage GetrGrupoFamiliar(int idLegajo)
        {
            var resultado = BuscarGrupoFamiliar(idLegajo);

            return RetornarOK(resultado);
        }

        [Route("GetMisTributos/{idPersona}/{idJurisdiccion}")]
        [HttpGet]
        public HttpResponseMessage GetMisTributos(int idPersona, int idJurisdiccion)
        {
            var resultado = BuscarMisTributos(idPersona, idJurisdiccion);

            return RetornarOK(resultado);
        }

        [Route("GetMisMensajes/{idLegajo}")]
        [HttpGet]
        public HttpResponseMessage GetMisMensajes(string idLegajo)
        {
            var resultado = BuscarMisMensajes(idLegajo);

            return RetornarOK(resultado);
        }

        [Route("GetMisMensajesBaja/{idLegajo}")]
        [HttpGet]
        public HttpResponseMessage GetMisMensajesBaja(string idLegajo)
        {
            var resultado = BuscarMisMensajesBaja(idLegajo);

            return RetornarOK(resultado);
        }

        [Route("GetMisRespuestas/{idLegajo}")]
        [HttpGet]
        public HttpResponseMessage GetMisRespuestas(string idLegajo)
        {
            var resultado = BuscarMisRespuestas(idLegajo);

            return RetornarOK(resultado);
        }

        [Route("GetMisRecibosSueldo/{idUsuario}/{anio}")]
        [HttpGet]
        public HttpResponseMessage GetMisRecibosSueldo(int idUsuario, String anio)
        {
            try
            {
                var resultado = BuscarMisRecibosSueldo(idUsuario, anio);
                return RetornarOK(resultado);
            }
            catch (Exception ex)
            {
                return RetornarOK(ex);
            }
        }

        [Route("GetTiposLicenciaListado/{idJurisdiccion}")]
        [HttpGet]
        public HttpResponseMessage GetTiposLicenciaListado(int idJurisdiccion = 0)
        {
            try
            {
                var resultado = BuscarTiposLicenciaListado(idJurisdiccion);
                return RetornarOK(resultado);
            }
            catch (Exception ex)
            {
                return RetornarOK(ex);
            }
        }

        [Route("GetCantidadDiasLegajo/{idTipoLicencia}/{idLegajo}/{anio}/{licenciaId}")]
        [HttpGet]
        public HttpResponseMessage GetCantidadDiasLegajo(int idTipoLicencia, int idLegajo, int anio, int licenciaId = 0)
        {
            try
            {
                var resultado = BuscarCantidadDiasLegajo(idTipoLicencia, idLegajo, anio, licenciaId);
                return RetornarOK(resultado);
            }
            catch (Exception ex)
            {
                return RetornarOK(ex);
            }
        }

        [HttpGet]
        [Route("GetTiposIdentificacionListado")]
        public HttpResponseMessage GetTiposIdentificacionListado()
        {
            var resultado = BuscarTiposIdentificacionListado();

            return RetornarOK(resultado);
        }

        [Route("GetTraerParaEditarFamiliar/{grupo_fam_id}")]
        [HttpGet]
        public HttpResponseMessage GetTraerParaEditarFamiliar(int grupo_fam_id)
        {
            var resultado = TraerParaEditarFamiliar(grupo_fam_id);

            return RetornarOK(resultado);
        }

        [Route("GetTraerParaEditarMensaje/{p_id_bandeja_mensaje}/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage GetTraerParaEditarMensaje(int p_id_bandeja_mensaje, int p_legajo_id)
        {
            var resultado = TraerParaEditarMensaje(p_id_bandeja_mensaje, p_legajo_id);

            return RetornarOK(resultado);
        }


        [Route("GetTraerOriginal/{p_id_bandeja_mensaje}")]
        [HttpGet]
        public HttpResponseMessage GetTraerOriginal(int p_id_bandeja_mensaje)
        {
            var resultado = TraerOriginal(p_id_bandeja_mensaje);

            return RetornarOK(resultado);
        }

        [Route("GetTraerParaEditarAdelanto/{id_vale}")]
        [HttpGet]
        public HttpResponseMessage GetTraerParaEditarAdelanto(int id_vale)
        {
            var resultado = TraerParaEditarAdelanto(id_vale);

            return RetornarOK(resultado);
        }

        [Route("GetTraerParaEditarLicencia/{licencia_id}")]
        [HttpGet]
        public HttpResponseMessage GetTraerParaEditarLicencia(int licencia_id)
        {
            var resultado = TraerParaEditarLicencia(licencia_id);

            return RetornarOK(resultado);
        }

        [Route("GetPeriodos/{anio}")]
        [HttpGet]
        public HttpResponseMessage GetPeriodos(int anio)
        {
            var resultado = BuscarPeriodos(anio);

            return RetornarOK(resultado);
        }

        [Route("GetTiposLiquidacion")]
        [HttpGet]
        public HttpResponseMessage GetTiposLiquidacion()
        {
            var resultado = BuscarTiposLiquidacion();

            return RetornarOK(resultado);
        }

        [Route("GetLegajosDestinatarios/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage GetLegajosDestinatarios(int p_legajo_id)
        {
            var resultado = BuscarLegajosDestinatarios(p_legajo_id);

            return RetornarOK(resultado);
        }

        [Route("GetTraerAdelantoDetalles/{id_vale}")]
        [HttpGet]
        public HttpResponseMessage GetTraerAdelantoDetalles(int id_vale)
        {
            var resultado = TraerAdelantoDetalles(id_vale);

            return RetornarOK(resultado);
        }

        [Route("AddLicencia")]
        [HttpPost]
        public HttpResponseMessage AddLicencia([FromBody] Licencia licencia)
        {
            var resultado = InsertarLicencia(licencia);

            return RetornarOK(resultado);
        }

        [Route("AddFamiliar")]
        [HttpPost]
        public HttpResponseMessage AddFamiliar([FromBody] Familiar familiar)
        {
            var resultado = InsertarFamiliar(familiar);

            return RetornarOK(resultado);
        }

        [Route("AddMensaje")]
        [HttpPost]
        public HttpResponseMessage AddMensaje([FromBody] Mensaje mensaje)
        {
            var resultado = InsertarMensaje(mensaje);

            return RetornarOK(resultado);
        }

        [Route("UpdateFamiliar")]
        [HttpPost]
        public HttpResponseMessage UpdateFamiliar([FromBody] Familiar familiar)
        {
            var resultado = ActualizarFamiliar(familiar);

            return RetornarOK(resultado);
        }

        [Route("AddAdelanto")]
        [HttpPost]
        public HttpResponseMessage AddAdelanto([FromBody] Adelanto adelanto)
        {
            var resultado = InsertarAdelanto(adelanto);

            return RetornarOK(resultado);
        }

        [Route("UpdateAdelanto")]
        [HttpPost]
        public HttpResponseMessage UpdateAdelanto([FromBody] Adelanto adelanto)
        {
            var resultado = ActualizarAdelanto(adelanto);

            return RetornarOK(resultado);
        }

        [Route("UpdateLicencia")]
        [HttpPost]
        public HttpResponseMessage UpdateLicencia([FromBody] Licencia licencia)
        {
            var resultado = ActualizarLicencia(licencia);

            return RetornarOK(resultado);
        }

        [Route("DeleteFamiliar")]
        [HttpPost]
        public HttpResponseMessage DeleteFamiliar([FromBody] EliminarFamiliarDto data)
        {
            var resultado = EliminarFamiliar(data.IdGrupoFamiliar, data.UserBaja);

            return RetornarOK(resultado);
        }

        [Route("DeleteAdelanto")]
        [HttpPost]
        public HttpResponseMessage DeleteAdelanto([FromBody] EliminarAdelantoDto adelanto)
        {
            var resultado = EliminarAdelanto(adelanto.IdVale, adelanto.UserBaja);

            return RetornarOK(resultado);
        }

        [Route("DeleteLicencia")]
        [HttpPost]
        public HttpResponseMessage DeleteLicencia([FromBody] EliminarLicenciaDto licencia)
        {
            var resultado = EliminarLicencia(licencia.IdLicencia, licencia.UserBaja);

            return RetornarOK(resultado);
        }


        [Route("SendMensajesAPapelera/{p_mensajes_a_papelera}/{p_legajo_id}/{p_estado_a_pasar}")]
        [HttpGet]
        public HttpResponseMessage SendMensajesAPapelera(string p_mensajes_a_papelera, int p_legajo_id, bool p_estado_a_pasar)
        {
            var resultado = MensajesAPapelera(p_mensajes_a_papelera, p_legajo_id, p_estado_a_pasar);

            return RetornarOK(resultado);
        }

        [Route("SendMensajesPasarLeido/{p_mensajes_pasar_leido}/{p_legajo_id}/{p_estado_a_pasar}")]
        [HttpGet]
        public HttpResponseMessage SendMensajesPasarLeido(string p_mensajes_pasar_leido, int p_legajo_id, bool p_estado_a_pasar)
        {
            var resultado = MensajesPasarLeido(p_mensajes_pasar_leido, p_legajo_id, p_estado_a_pasar);

            return RetornarOK(resultado);
        }

        [Route("SendMensajesPasarAFavoritos/{p_mensajes_pasar_favoritos}/{p_legajo_id}/{p_estado_a_pasar}")]
        [HttpGet]
        public HttpResponseMessage SendMensajesPasarAFavoritos(string p_mensajes_pasar_favoritos, int p_legajo_id, bool p_estado_a_pasar)
        {
            var resultado = MensajesPasarAFavoritos(p_mensajes_pasar_favoritos, p_legajo_id, p_estado_a_pasar);

            return RetornarOK(resultado);
        }

        [Route("SendEliminarMensajesPapelera/{p_mensajes_papelera}/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage SendEliminarMensajesPapelera(string p_mensajes_papelera, int p_legajo_id)
        {
            var resultado = EliminarMensajesPapelera(p_mensajes_papelera, p_legajo_id);

            return RetornarOK(resultado);
        }

        [Route("AddMensajeRespuesta")]
        [HttpPost]
        public HttpResponseMessage AddMensajeRespuesta([FromBody] Mensaje mensaje)
        {
            var resultado = InsertarMensajeRespuesta(mensaje);

            return RetornarOK(resultado);
        }


        [Route("UpdateMisRecibos")]
        [HttpPost]
        public HttpResponseMessage UpdateMisRecibos([FromBody] Recibo recibo)
        {
            var resultado = ActualizarRecibos(recibo);

            return RetornarOK(resultado);
        }

        [Route("GetRepLicenciasSolcitadasXAnio/{p_legajo_id}/{p_anio}")]
        [HttpGet]
        public HttpResponseMessage GetRepLicenciasSolcitadasXAnio(string p_legajo_id, string p_anio)
        {
            var resultado = RepLicenciasSolcitadasXAnio(p_legajo_id, p_anio);

            return RetornarOK(resultado);
        }

        [Route("GetRepLicenciasDiasDisponiblesXAnio/{p_legajo_id}/{p_anio}")]
        [HttpGet]
        public HttpResponseMessage GetRepLicenciasDiasDisponiblesXAnio(string p_legajo_id, string p_anio)
        {
            var resultado = RepLicenciasDiasDisponiblesXAnio(p_legajo_id, p_anio);

            return RetornarOK(resultado);
        }

        [Route("GetRepAdelantosSolicitadoXAnio/{p_legajo_id}/{p_anio}")]
        [HttpGet]
        public HttpResponseMessage GetRepAdelantosSolicitadoXAnio(string p_legajo_id, string p_anio)
        {
            var resultado = RepAdelantosSolicitadoXAnio(p_legajo_id, p_anio);

            return RetornarOK(resultado);
        }

        [Route("GetBuscarNotificaciones/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage GetBuscarNotificaciones(string p_legajo_id)
        {
            var resultado = BuscarNotificaciones(p_legajo_id);

            return RetornarOK(resultado);
        }

        [Route("SetNotificacionMarcarLeida/{p_id_noti}")]
        [HttpGet]
        public HttpResponseMessage SetNotificacionMarcarLeida(string p_id_noti)
        {
            var resultado = NotificacionMarcarLeida(p_id_noti);

            return RetornarOK(resultado);
        }

        [Route("SetCambiaEstadoLicencia/{p_licencia_id}/{p_estado}/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage SetCambiaEstadoLicencia(string p_licencia_id, string p_estado, string p_legajo_id)
        {
            var resultado = CambiaEstadoLicencia(p_licencia_id, p_estado, p_legajo_id);

            return RetornarOK(resultado);
        }

        [Route("SetCambiaEstadoAdelanto/{p_vale_id}/{p_estado}/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage SetCambiaEstadoAdelanto(string p_vale_id, string p_estado, string p_legajo_id)
        {
            var resultado = CambiaEstadoAdelanto(p_vale_id, p_estado, p_legajo_id);

            return RetornarOK(resultado);
        }

        [Route("GetBuscarMisNotificaciones/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage GetBuscarMisNotificaciones(string p_legajo_id)
        {
            var resultado = BuscarMisNotificaciones(p_legajo_id);

            return RetornarOK(resultado);
        }

        [Route("SetNotificacionMarcarLeidaMasiva/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage SetNotificacionMarcarLeidaMasiva(string p_legajo_id)
        {
            var resultado = NotificacionMarcarLeidaMasiva(p_legajo_id);

            return RetornarOK(resultado);
        }

        [Route("GetBuscarMensajesFavoritos/{p_legajo_id}")]
        [HttpGet]
        public HttpResponseMessage GetBuscarMensajesFavoritos(string p_legajo_id)
        {
            var resultado = BuscarMensajesFavoritos(p_legajo_id);

            return RetornarOK(resultado);
        }

        public DataTable BuscarMiLegajo(int idUsuario)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mi_legajo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_usuario_id", NpgsqlDbType.Integer));
                    cmd.Parameters[0].Value = idUsuario;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarLicenciasSolicitadas(int idLegajo)
        {

            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mis_licencias", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Integer));
                    cmd.Parameters[0].Value = idLegajo;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisAdelantos(int idLegajo)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mis_adelantos", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Integer));
                    cmd.Parameters[0].Value = idLegajo;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarGrupoFamiliar(int idUsuario)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mi_grupo_familiar", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_usuario_id", NpgsqlDbType.Integer));
                    cmd.Parameters[0].Value = idUsuario;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisTributos(int idPersona, int idJurisdiccion)
        {

            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("grillaprincipal_con_baja", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_persona", NpgsqlDbType.Numeric));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_jurisdiccion", NpgsqlDbType.Numeric));
                    cmd.Parameters[0].Value = idPersona;
                    cmd.Parameters[1].Value = idJurisdiccion;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisMensajes(string idLegajo)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mensajes_legajo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = idLegajo;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisMensajesBaja(string idLegajo)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mensajes_legajo_baja", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = idLegajo;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisRespuestas(string idLegajo)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_respuestas_legajo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = idLegajo;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisRecibosSueldo(int idUsuario, String anio)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mis_recibos_x_anio", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_usuario_id", NpgsqlDbType.Integer));
                    cmd.Parameters.Add(new NpgsqlParameter("p_anio", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = idUsuario;
                    cmd.Parameters[1].Value = anio;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarTiposLicenciaListado(Int32 idJurisdiccion)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_tipos_licencia", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_jurisdiccion", NpgsqlDbType.Integer));
                    cmd.Parameters[0].Value = idJurisdiccion;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }
        public DataTable BuscarTiposIdentificacionListado()
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_tipos_identificacion", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarCantidadDiasLegajo(Int32 idTipoLicencia, Int32 idLegajo, Int32 anio, Int32 licenciaId)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("cantidad_dias_legajo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_licencia_id", NpgsqlDbType.Integer));
                    cmd.Parameters.Add(new NpgsqlParameter("p_tipo_licencia_id", NpgsqlDbType.Integer));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Integer));
                    cmd.Parameters.Add(new NpgsqlParameter("p_anio", NpgsqlDbType.Integer));
                    cmd.Parameters[0].Value = licenciaId;
                    cmd.Parameters[1].Value = idTipoLicencia;
                    cmd.Parameters[2].Value = idLegajo;
                    cmd.Parameters[3].Value = anio;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }
        public DataTable TraerParaEditarFamiliar(int grupo_fam_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("traer_para_editar_familiar", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_grupo_fam", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = grupo_fam_id;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarTiposLiquidacion()
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_tipos_liquidacion", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }
        public DataTable BuscarLegajosDestinatarios(int p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_legajos_destinatarios", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_legajo_id;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarPeriodos(int p_anio)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_periodos", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_anio", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_anio;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable TraerParaEditarAdelanto(int p_id_vale)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("traer_para_editar_adelanto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_vale", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_id_vale;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable TraerParaEditarMensaje(int id_bandeja_mensaje, int legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("traer_para_editar_mensaje", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_bandeja_mensaje", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = id_bandeja_mensaje;
                    cmd.Parameters[1].Value = legajo_id;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable TraerOriginal(int id_bandeja_mensaje)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("traer_mensaje_original", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_bandeja_mensaje", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = id_bandeja_mensaje;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable TraerAdelantoDetalles(int p_id_vale)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_adelantos_detalles", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_vale", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_id_vale;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable InsertarFamiliar(Familiar familiar)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("insertar_familiar", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_parentesco", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_discapacitado", NpgsqlDbType.Boolean));
                    cmd.Parameters.Add(new NpgsqlParameter("p_escolaridad", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_adicional_ob_social", NpgsqlDbType.Boolean));
                    cmd.Parameters.Add(new NpgsqlParameter("p_usr_ing", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_a_cargo", NpgsqlDbType.Boolean));
                    cmd.Parameters.Add(new NpgsqlParameter("p_fecha_nac", NpgsqlDbType.TimestampTz));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_tipo_identificacion", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nro_documento", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_apellido", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo_partida", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo_partida", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo_discapacidad", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo_discapacidad", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo_escolaridad", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo_escolaridad", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = familiar.LegajoId;
                    cmd.Parameters[1].Value = familiar.IdParentesco;
                    cmd.Parameters[2].Value = familiar.Discapacitado;
                    cmd.Parameters[3].Value = familiar.Escolaridad;
                    cmd.Parameters[4].Value = familiar.AdicionalObSocial;
                    cmd.Parameters[5].Value = familiar.UsrIng;
                    cmd.Parameters[6].Value = familiar.ACargo;
                    cmd.Parameters[7].Value = familiar.FecNac;
                    cmd.Parameters[8].Value = familiar.IdTipoIdentificacion;
                    cmd.Parameters[9].Value = familiar.NroDocumento;
                    cmd.Parameters[10].Value = familiar.Nombre;
                    cmd.Parameters[11].Value = familiar.Apellido;

                    cmd.Parameters[12].Value = familiar.ArchivoPartida;

                    if (familiar.ArchivoPartida != null && familiar.ArchivoPartida != "")
                    {
                        cmd.Parameters[12].Value = Convert.FromBase64String(familiar.ArchivoPartida); ;
                    }
                    else
                        cmd.Parameters[12].Value = DBNull.Value;

                    if (familiar.ArchivoPartida != null && familiar.ArchivoPartida != "")
                        cmd.Parameters[13].Value = familiar.NombreArchivoPartida;
                    else
                        cmd.Parameters[13].Value = DBNull.Value;

                    cmd.Parameters[14].Value = familiar.ArchivoDiscapacidad;

                    if (familiar.ArchivoDiscapacidad != null && familiar.ArchivoDiscapacidad != "")
                    {
                        cmd.Parameters[14].Value = Convert.FromBase64String(familiar.ArchivoDiscapacidad); ;
                    }
                    else
                        cmd.Parameters[14].Value = DBNull.Value;


                    if (familiar.NombreArchivoDiscapacidad != null && familiar.NombreArchivoDiscapacidad != "")
                        cmd.Parameters[15].Value = familiar.NombreArchivoDiscapacidad;
                    else
                        cmd.Parameters[15].Value = DBNull.Value;

                    cmd.Parameters[16].Value = familiar.ArchivoEscolaridad;

                    if (familiar.ArchivoEscolaridad != null && familiar.ArchivoEscolaridad != "")
                    {
                        cmd.Parameters[16].Value = Convert.FromBase64String(familiar.ArchivoEscolaridad); ;
                    }
                    else
                        cmd.Parameters[16].Value = DBNull.Value;

                    if (familiar.NombreArchivoEscolaridad != null && familiar.NombreArchivoEscolaridad != "")
                        cmd.Parameters[17].Value = familiar.NombreArchivoEscolaridad;
                    else
                        cmd.Parameters[17].Value = DBNull.Value;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable ActualizarFamiliar(Familiar familiar)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("editar_familiar", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_grupo_fam", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_parentesco", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_discapacitado", NpgsqlDbType.Boolean));
                    cmd.Parameters.Add(new NpgsqlParameter("p_escolaridad", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_adicional_ob_social", NpgsqlDbType.Boolean));
                    cmd.Parameters.Add(new NpgsqlParameter("p_usr_mod", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_a_cargo", NpgsqlDbType.Boolean));
                    cmd.Parameters.Add(new NpgsqlParameter("p_fecha_nac", NpgsqlDbType.TimestampTz));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_tipo_identificacion", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nro_documento", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_apellido", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo_partida", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo_partida", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo_discapacidad", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo_discapacidad", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo_escolaridad", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo_escolaridad", NpgsqlDbType.Varchar));

                    cmd.Parameters[0].Value = familiar.IdGrupoFamiliar;
                    cmd.Parameters[1].Value = familiar.IdParentesco;
                    cmd.Parameters[2].Value = familiar.Discapacitado;
                    cmd.Parameters[3].Value = familiar.Escolaridad;
                    cmd.Parameters[4].Value = familiar.AdicionalObSocial;
                    cmd.Parameters[5].Value = familiar.UsrMod;
                    cmd.Parameters[6].Value = familiar.ACargo;
                    if (familiar.FecNac.Kind != DateTimeKind.Unspecified)
                        cmd.Parameters[7].Value = familiar.FecNac;
                    else
                        cmd.Parameters[7].Value = DBNull.Value;
                    cmd.Parameters[8].Value = familiar.IdTipoIdentificacion;
                    cmd.Parameters[9].Value = familiar.NroDocumento;
                    cmd.Parameters[10].Value = familiar.Nombre;
                    cmd.Parameters[11].Value = familiar.Apellido;

                    cmd.Parameters[12].Value = familiar.ArchivoPartida;

                    if (familiar.ArchivoPartida != null && familiar.ArchivoPartida != "")
                    {
                        cmd.Parameters[12].Value = Convert.FromBase64String(familiar.ArchivoPartida); ;
                    }
                    else
                        cmd.Parameters[12].Value = DBNull.Value;

                    if (familiar.ArchivoPartida != null && familiar.ArchivoPartida != "")
                        cmd.Parameters[13].Value = familiar.NombreArchivoPartida;
                    else
                        cmd.Parameters[13].Value = DBNull.Value;

                    cmd.Parameters[14].Value = familiar.ArchivoDiscapacidad;

                    if (familiar.ArchivoDiscapacidad != null && familiar.ArchivoDiscapacidad != "")
                    {
                        cmd.Parameters[14].Value = Convert.FromBase64String(familiar.ArchivoDiscapacidad); ;
                    }
                    else
                        cmd.Parameters[14].Value = DBNull.Value;


                    if (familiar.NombreArchivoDiscapacidad != null && familiar.NombreArchivoDiscapacidad != "")
                        cmd.Parameters[15].Value = familiar.NombreArchivoDiscapacidad;
                    else
                        cmd.Parameters[15].Value = DBNull.Value;

                    cmd.Parameters[16].Value = familiar.ArchivoEscolaridad;

                    if (familiar.ArchivoEscolaridad != null && familiar.ArchivoEscolaridad != "")
                    {
                        cmd.Parameters[16].Value = Convert.FromBase64String(familiar.ArchivoEscolaridad); ;
                    }
                    else
                        cmd.Parameters[16].Value = DBNull.Value;

                    if (familiar.NombreArchivoEscolaridad != null && familiar.NombreArchivoEscolaridad != "")
                        cmd.Parameters[17].Value = familiar.NombreArchivoEscolaridad;
                    else
                        cmd.Parameters[17].Value = DBNull.Value;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable EliminarFamiliar(int id_grupo_fam, string user_baja)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("eliminar_familiar", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_grupo_fam", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_user_baja", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = id_grupo_fam;
                    cmd.Parameters[1].Value = user_baja;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable EliminarAdelanto(int id_vale, string user_baja)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("eliminar_adelanto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_vale", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_user_baja", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = id_vale;
                    cmd.Parameters[1].Value = user_baja;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }
        public DataTable EliminarLicencia(int licencia_id, string user_baja)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("eliminar_licencia", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_licencia_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_user_baja", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = licencia_id;
                    cmd.Parameters[1].Value = user_baja;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable InsertarAdelanto(Adelanto adelanto)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("insertar_vale", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_cuotas", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_concepto", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_usr_ing", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_tipo_liquidacion", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_monto", NpgsqlDbType.Numeric));
                    cmd.Parameters.Add(new NpgsqlParameter("p_periodo_id", NpgsqlDbType.Smallint));
                    cmd.Parameters[0].Value = adelanto.IdLegajo;
                    cmd.Parameters[1].Value = adelanto.Cuotas;
                    cmd.Parameters[2].Value = adelanto.Concepto;
                    cmd.Parameters[3].Value = adelanto.UsrIng;
                    cmd.Parameters[4].Value = adelanto.IdTipoLiquidacion;
                    cmd.Parameters[5].Value = adelanto.Monto;
                    cmd.Parameters[6].Value = adelanto.PeriodoId;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        var ad = BuscarUltimoAdelantoLegajo(adelanto.IdLegajo);

                        var asunto = "Emitida solicitud de adelanto 'Mi Legajo'";

                        var cuerpo = "Se ha emitido tu solicitud de adelanto número " + Convert.ToString(ad.Rows[0]["vale"]) + " emitida en la fecha "
                            + Convert.ToString(ad.Rows[0]["fecha_emision"]) +
                            " por un monto de " + Convert.ToString(ad.Rows[0]["monto_total"]) + "$ en " +
                            Convert.ToString(ad.Rows[0]["cuotas"]) + " cuota/s en concepto de '" +
                            Convert.ToString(ad.Rows[0]["concepto"]) + "'. \n"
                            + "\n"
                            + "Puedes ingresar a 'Mi Legajo' para ver los detalles de la solicitud, te notificaremos una vez que esta sea evaluada.";

                        MandarMail(Convert.ToInt32(adelanto.IdLegajo), asunto, cuerpo);
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable ActualizarAdelanto(Adelanto adelanto)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("editar_vale", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_vale", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_cuotas", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_concepto", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_usr_mod", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_tipo_liquidacion", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_monto", NpgsqlDbType.Numeric));
                    cmd.Parameters.Add(new NpgsqlParameter("p_periodo_id", NpgsqlDbType.Smallint));
                    cmd.Parameters[0].Value = adelanto.IdVale;
                    cmd.Parameters[1].Value = adelanto.Cuotas;
                    cmd.Parameters[2].Value = adelanto.Concepto;
                    cmd.Parameters[3].Value = adelanto.UsrMod;
                    cmd.Parameters[4].Value = adelanto.IdTipoLiquidacion;
                    cmd.Parameters[5].Value = adelanto.Monto;
                    cmd.Parameters[6].Value = adelanto.PeriodoId;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }
        public DataTable TraerParaEditarLicencia(int id_licencia)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("traer_para_editar_licencia", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_licencia_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = id_licencia;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable InsertarLicencia(Licencia licencia)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("insertar_licencia", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_tipo_licencia_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_inicio", NpgsqlDbType.TimestampTz));
                    cmd.Parameters.Add(new NpgsqlParameter("p_fin", NpgsqlDbType.TimestampTz));
                    cmd.Parameters.Add(new NpgsqlParameter("p_detalle", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_pertenece_anio", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_usr_ing", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_cant_dias_disponibles", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo", NpgsqlDbType.Bytea));
                    cmd.Parameters[0].Value = licencia.IdLegajo;
                    cmd.Parameters[1].Value = licencia.IdTipoLicencia;
                    cmd.Parameters[2].Value = licencia.FecInicio;
                    cmd.Parameters[3].Value = licencia.FecFin;
                    cmd.Parameters[4].Value = licencia.Detalles;
                    cmd.Parameters[5].Value = licencia.Anio;
                    cmd.Parameters[6].Value = licencia.UsrIng;
                    cmd.Parameters[7].Value = licencia.CantDiasDisponibles;
                    if (licencia.NombreArchivo != null && licencia.NombreArchivo != "")
                    {
                        cmd.Parameters[8].Value = licencia.NombreArchivo;
                    }
                    else
                        cmd.Parameters[8].Value = DBNull.Value;
                    if (licencia.Archivo != null && licencia.Archivo != "")
                    {
                        cmd.Parameters[9].Value = Convert.FromBase64String(licencia.Archivo); ;
                    }
                    else
                        cmd.Parameters[9].Value = DBNull.Value;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        var li = BuscarUltimaLicenciaLegajo(licencia.IdLegajo);

                        var asunto = "Emitida solicitud de licencia 'Mi Legajo'";

                        var cuerpo = "Se ha emitido tu solicitud de licencia número " + Convert.ToString(li.Rows[0]["licencia"]) + " emitida en la fecha "
                            + Convert.ToString(li.Rows[0]["fec_ing"]) + " correspondiente a un período de " +
                            Convert.ToString(li.Rows[0]["cantidad_dias"]) + " días(" + Convert.ToString(li.Rows[0]["detalles"]) +
                            ")." + "\n"
                            + "\n"
                            + "Puedes ingresar a 'Mi Legajo' para ver los detalles de la solicitud, te notificaremos una vez que esta sea evaluada.";

                        MandarMail(Convert.ToInt32(licencia.IdLegajo), asunto, cuerpo);
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable ActualizarLicencia(Licencia licencia)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("editar_licencia", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_licencia_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_tipo_licencia_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_detalle", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_pertenece_anio", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_usr_mod", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_cant_dias_disponibles", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_inicio", NpgsqlDbType.TimestampTz));
                    cmd.Parameters.Add(new NpgsqlParameter("p_fin", NpgsqlDbType.TimestampTz));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo", NpgsqlDbType.Bytea));
                    cmd.Parameters[0].Value = licencia.IdLicencia;
                    cmd.Parameters[1].Value = licencia.IdTipoLicencia;
                    cmd.Parameters[2].Value = licencia.Detalles;
                    cmd.Parameters[3].Value = licencia.Anio;
                    cmd.Parameters[4].Value = licencia.UsrMod;
                    cmd.Parameters[5].Value = licencia.CantDiasDisponibles;
                    if (licencia.FecInicio.Kind != DateTimeKind.Unspecified)
                        cmd.Parameters[6].Value = licencia.FecInicio;
                    else
                        cmd.Parameters[6].Value = DBNull.Value;
                    if (licencia.FecFin.Kind != DateTimeKind.Unspecified)
                        cmd.Parameters[7].Value = licencia.FecFin;
                    else
                        cmd.Parameters[7].Value = DBNull.Value;
                    cmd.Parameters[8].Value = licencia.NombreArchivo;
                    Byte[] blob = null;

                    if (licencia.Archivo != "")
                    {
                        blob = Convert.FromBase64String(licencia.Archivo);
                        cmd.Parameters[9].Value = blob;
                    }
                    else
                        cmd.Parameters[9].Value = DBNull.Value;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable InsertarMensaje(Mensaje mensaje)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("insertar_mensaje", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_legajo_destinatario", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_asunto", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_mensaje", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = mensaje.IdLegajo;
                    cmd.Parameters[1].Value = mensaje.IdLegajoDestinatario;
                    cmd.Parameters[2].Value = mensaje.Asunto;
                    cmd.Parameters[3].Value = mensaje.Mensaje1;
                    if (mensaje.Archivo != null && mensaje.Archivo != "")
                    {
                        cmd.Parameters[4].Value = Convert.FromBase64String(mensaje.Archivo);
                    }
                    else
                        cmd.Parameters[4].Value = DBNull.Value;

                    if (mensaje.NombreArchivo != null && mensaje.NombreArchivo != "")
                    {
                        cmd.Parameters[5].Value = mensaje.NombreArchivo;
                    }
                    else
                        cmd.Parameters[5].Value = DBNull.Value;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable MensajesAPapelera(string mensajes_a_papelera, int legajo_id, bool estado_a_pasar)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("mensajes_papelera", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_mensajes_papelera", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_estado_a_pasar", NpgsqlDbType.Boolean));
                    cmd.Parameters[0].Value = mensajes_a_papelera;
                    cmd.Parameters[1].Value = legajo_id;
                    cmd.Parameters[2].Value = estado_a_pasar;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable MensajesPasarLeido(string mensajes_pasar_leido, int legajo_id, bool estado_a_pasar)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("pasar_mensajes_leido", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_mensajes_pasar_leido", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_estado_a_pasar", NpgsqlDbType.Boolean));
                    cmd.Parameters[0].Value = mensajes_pasar_leido;
                    cmd.Parameters[1].Value = legajo_id;
                    cmd.Parameters[2].Value = estado_a_pasar;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable EliminarMensajesPapelera(string mensajes_papelera, int legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("eliminar_mensajes_papelera", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_mensajes_papelera", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = mensajes_papelera;
                    cmd.Parameters[1].Value = legajo_id;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable InsertarMensajeRespuesta(Mensaje mensaje)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("insertar_mensaje_respuesta", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_bandeja_mensaje", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_legajo_destinatario", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_asunto", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_mensaje", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo", NpgsqlDbType.Bytea));
                    cmd.Parameters.Add(new NpgsqlParameter("p_nombre_archivo", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = mensaje.IdBandejaMensaje;
                    cmd.Parameters[1].Value = mensaje.IdLegajo;
                    cmd.Parameters[2].Value = mensaje.IdLegajoDestinatario;
                    cmd.Parameters[3].Value = mensaje.Asunto;
                    cmd.Parameters[4].Value = mensaje.Mensaje1;
                    if (mensaje.Archivo != null && mensaje.Archivo != "")
                    {
                        cmd.Parameters[5].Value = Convert.FromBase64String(mensaje.Archivo); ;
                    }
                    else
                        cmd.Parameters[5].Value = DBNull.Value;

                    if (mensaje.NombreArchivo != null && mensaje.NombreArchivo != "")
                    {
                        cmd.Parameters[6].Value = mensaje.NombreArchivo;
                    }
                    else
                        cmd.Parameters[6].Value = DBNull.Value;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        var respuesta = BuscarMailDestinatario(mensaje.IdLegajo, mensaje.IdLegajoDestinatario);
                        var asunto = Convert.ToString(respuesta.Rows[0]["nombre"]) + " ha respondido a tu mensaje en 'Mi Legajo'.";

                        var cuerpo =
                            "Remitente: " + Convert.ToString(respuesta.Rows[0]["nombre"]) + "\n"
                            + "Destinatario: " + Convert.ToString(respuesta.Rows[0]["nombre_destinatario"]) + "\n"
                            + "Fecha de emisión: " + DateTime.Now.ToString("dd/MM/yyyy") + "\n"
                            + "\n"
                            + "Asunto: " + mensaje.Asunto + "\n"
                            + "\n"
                            + "Mensaje: '" + mensaje.Mensaje1 + "' \n"
                            + "\n"
                            + "Puedes responder a este mensaje ingresando a 'Mi Legajo'";

                        MandarMail(Convert.ToInt32(mensaje.IdLegajoDestinatario), asunto, cuerpo);
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable ActualizarRecibos(Recibo recibo)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("editar_recibos", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_archivo", NpgsqlDbType.Bytea));
                    Byte[] blob = null;

                    if (recibo.Archivo != "" && recibo.Archivo != null)
                    {
                        blob = Convert.FromBase64String(recibo.Archivo);
                        cmd.Parameters[0].Value = blob;
                    }
                    else
                        cmd.Parameters[0].Value = DBNull.Value;
                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable RepLicenciasSolcitadasXAnio(string p_legajo_id, string p_anio)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("rep_licencias_solicitadas_x_anio", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_anio", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = p_legajo_id;
                    cmd.Parameters[1].Value = p_anio;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable RepLicenciasDiasDisponiblesXAnio(string p_legajo_id, string p_anio)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("rep_licencias_dias_disponibles_x_anio", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_anio", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = p_legajo_id;
                    cmd.Parameters[1].Value = p_anio;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable RepAdelantosSolicitadoXAnio(string p_legajo_id, string p_anio)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("rep_adelantos_solicitados_x_anio", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_anio", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = p_legajo_id;
                    cmd.Parameters[1].Value = p_anio;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarNotificaciones(string p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_notificaciones", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = p_legajo_id;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable NotificacionMarcarLeida(string p_id_noti)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("notificacion_marcar_leida", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_id_noti", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = Convert.ToInt64(p_id_noti);

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable CambiaEstadoLicencia(string p_licencia_id, string p_estado, string p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("cambia_estado_licencia", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_licencia_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_estado", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = Convert.ToInt64(p_licencia_id);
                    cmd.Parameters[1].Value = Convert.ToInt64(p_estado);
                    cmd.Parameters[2].Value = Convert.ToInt64(p_legajo_id);

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        var licencia = BuscarMisLicenciasMail(p_licencia_id);
                        var estado = "";
                        switch (p_estado)
                        {
                            case "1":
                                estado = "aprobado";
                                break;
                            case "2":
                                estado = "rechazado";
                                break;
                        }
                        var asunto = "Cambio de estado de solicitud de licencia 'Mi Legajo'";

                        var cuerpo = "Se ha " + estado + " tu solicitud de licencia número " + p_licencia_id + " emitida en la fecha "
                            + Convert.ToString(licencia.Rows[0]["fec_ing"]) + " correspondiente a un período de " +
                            Convert.ToString(licencia.Rows[0]["cantidad_dias"]) + " días(" + Convert.ToString(licencia.Rows[0]["detalles"]) +
                            ")." + "\n"
                            + "\n"
                            + "Puedes ingresar a 'Mi Legajo' para ver los detalles de la solicitud.";

                        MandarMail(Convert.ToInt32(p_legajo_id), asunto, cuerpo);
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisAdelantosMail(string p_vale_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mis_adelantos_mail", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_vale_id", NpgsqlDbType.Bigint));

                    cmd.Parameters[0].Value = Convert.ToInt64(p_vale_id);

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisLicenciasMail(string p_licencia_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mis_licencias_mail", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_licencia_id", NpgsqlDbType.Bigint));

                    cmd.Parameters[0].Value = Convert.ToInt64(p_licencia_id);

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable CambiaEstadoAdelanto(string p_vale_id, string p_estado, string p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("cambia_estado_adelanto", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_vale_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_estado", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = Convert.ToInt64(p_vale_id);
                    cmd.Parameters[1].Value = Convert.ToInt64(p_estado);
                    cmd.Parameters[2].Value = Convert.ToInt64(p_legajo_id);

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        var adelanto = BuscarMisAdelantosMail(p_vale_id);
                        var estado = "";
                        switch (p_estado)
                        {
                            case "1":
                                estado = "aprobado";
                                break;
                            case "2":
                                estado = "rechazado";
                                break;
                            case "3":
                                estado = "pagado";
                                break;
                        }
                        var asunto = "Cambio de estado de solicitud de adelanto 'Mi Legajo'";

                        var cuerpo = "Se ha " + estado + " tu solicitud de adelanto número " + Convert.ToString(adelanto.Rows[0]["nro_vale"]) + " emitida en la fecha "
                            + Convert.ToString(adelanto.Rows[0]["fecha_emision"]) +
                            " por un monto de " + Convert.ToString(adelanto.Rows[0]["monto_total"]) + "$ en " +
                            Convert.ToString(adelanto.Rows[0]["cuotas"]) + " cuota/s en concepto de '" +
                            Convert.ToString(adelanto.Rows[0]["concepto"]) + "' \n"
                            + "\n"
                            + "Puedes ingresar a 'Mi Legajo' para ver los detalles de la solicitud.";

                        MandarMail(Convert.ToInt32(p_legajo_id), asunto, cuerpo);
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMisNotificaciones(string p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mis_notificaciones", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = Convert.ToInt64(p_legajo_id);

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable NotificacionMarcarLeidaMasiva(string p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("notificacion_marcar_leida_masiva", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = Convert.ToInt64(p_legajo_id);

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarMensajesFavoritos(string p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mensajes_favoritos", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Varchar));
                    cmd.Parameters[0].Value = p_legajo_id;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable MensajesPasarAFavoritos(string p_mensajes_pasar_favoritos, int legajo_id, bool estado_a_pasar)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("pasar_mensajes_favoritos", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_mensajes_pasar_favoritos", NpgsqlDbType.Varchar));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_estado_a_pasar", NpgsqlDbType.Boolean));
                    cmd.Parameters[0].Value = p_mensajes_pasar_favoritos;
                    cmd.Parameters[1].Value = legajo_id;
                    cmd.Parameters[2].Value = estado_a_pasar;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable GetMail(int p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mail_legajo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_legajo_id;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable MandarMail(int p_legajo_id, string asunto, string cuerpo)
        {

            var emailRow = GetMail(p_legajo_id);

            String SendMailFrom = "milegajotesis@gmail.com";
            String SendMailTo = Convert.ToString(emailRow.Rows[0]["email"]);
            String SendMailSubject = asunto;
            String SendMailBody = cuerpo;

            try
            {
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com", 587);
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                MailMessage email = new MailMessage();

                email.From = new MailAddress(SendMailFrom);
                email.To.Add(SendMailTo);
                email.CC.Add(SendMailFrom);
                email.Subject = SendMailSubject;
                email.Body = SendMailBody;

                SmtpServer.Timeout = 5000;
                SmtpServer.EnableSsl = true;
                SmtpServer.UseDefaultCredentials = false;
                SmtpServer.Credentials = new NetworkCredential(SendMailFrom, "rcifvnefhlhjfiem");
                SmtpServer.Send(email);
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public DataTable BuscarMailDestinatario(int p_legajo_id, int p_legajo_destinatario_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_mail_destinatario", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_destinatario_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_legajo_id;
                    cmd.Parameters[1].Value = p_legajo_destinatario_id;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarUltimoAdelantoLegajo(int p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_ultimo_adelanto_legajo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_legajo_id;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }

        public DataTable BuscarUltimaLicenciaLegajo(int p_legajo_id)
        {
            string constr = ConfigurationManager.ConnectionStrings["postgres"].ConnectionString;
            using (NpgsqlConnection conn = new NpgsqlConnection(constr))
            {
                conn.Open();

                using (NpgsqlCommand cmd = new NpgsqlCommand("buscar_ultima_licencia_legajo", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Add(new NpgsqlParameter("p_legajo_id", NpgsqlDbType.Bigint));
                    cmd.Parameters[0].Value = p_legajo_id;

                    DataSet ds = new DataSet();
                    NpgsqlDataAdapter da = new NpgsqlDataAdapter(cmd);
                    da.Fill(ds);

                    if (ds.Tables.Count > 0)
                    {
                        return ds.Tables[0];
                    }

                    return null;
                }
            }
        }
    }
}


