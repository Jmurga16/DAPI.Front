using Microsoft.AspNetCore.Mvc;

namespace Proyecto_Contabilidad.Controllers
{
    public class AsientoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Crear()
        {
            return View();
        }
    }
}
