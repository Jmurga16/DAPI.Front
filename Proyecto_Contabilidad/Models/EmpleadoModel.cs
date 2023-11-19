using Proyecto_Contabilidad.Entities;

namespace Proyecto_Contabilidad.Models
{
    public class EmpleadoModel
    {
        //string urlWebApi = ConfigurationManager.AppSettings["urlWebApi"].ToString();

        //public EmpleadoEnt IniciarSesion(EmpleadoEnt entidad)
        //{
        //    using (var client = new HttpClient())
        //    {
        //        string url = urlWebApi + "api/IniciarSesion";
        //        JsonContent body = JsonContent.Create(entidad); //serializar

        //        HttpResponseMessage resp = client.PostAsync(url, body).Result;

        //        if (resp.IsSuccessStatusCode)
        //        {
        //            return resp.Content.ReadFromJsonAsync<EmpleadoEnt>().Result;
        //        }
        //        return null;
        //    }
        //}
    }
}
