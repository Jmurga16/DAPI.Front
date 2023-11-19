using Microsoft.AspNetCore.Mvc;
using Proyecto_Contabilidad.Models;
using System.Diagnostics;
using Proyecto_Contabilidad.Entities;

namespace Proyecto_Contabilidad.Controllers
{
    public class HomeController : Controller
    {

        //public ActionResult IniciarSesion(EmpleadoEnt entidad)
        //{

        //    var resp = model.IniciarSesion(entidad);

        //    if (resp != null)
        //    {
        //        entidad.Role_Id = ;
        //        entidad.Department_Id = ;
        //        entidad.First_Name = ;
        //        entidad.Last_Name = ;
        //        entidad.Identification = ;
        //        entidad.Genre = ;
        //        entidad.Username = ;
        //        entidad.Email_Addres = ;
        //        entidad.User_Password = ;

        //        return RedirectToAction("Principal", "Home");
        //    }
        //    else
        //    {
        //        ViewBag.MsjPantalla = "No se ha podido validar su información";
        //        return View("Index");
        //    }
        //}
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Colaboradores()
        {
            return View();
        }

        public IActionResult Cliente()
        {
            return View();
        }
        public IActionResult Aprobacion()
        {
            return View();
        }
        public IActionResult Reportes()
        {
            return View();
        }
        public IActionResult Cuentas()
        {
            return View();
        }
        public IActionResult Asientos()
        {
            return View();
        }
        public IActionResult Metricas()
        {
            return View();
        }
        public IActionResult Perfil()
        {
            return View();
        }

        public IActionResult Editar()
        {
            return View();
        }

        public IActionResult Eliminar()
        {
            return View();
        }

        public IActionResult Nuevo()
        {
            return View();
        }

        public IActionResult Editar2()
        {
            return View();
        }

        public IActionResult Editar3()
        {
            return View();
        }
        public IActionResult Eliminar2()
        {
            return View();
        }

        public IActionResult Repoprte1()
        {
            return View();
        }
        public IActionResult Nuevo2()
        {
            return View();
        }
        public IActionResult Nuevo3()
        {
            return View();
        }

        public IActionResult Password()
        {
            return View();
        }

        public IActionResult Password2()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}