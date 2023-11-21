using Microsoft.AspNetCore.Mvc;

namespace Proyecto_Contabilidad.Controllers
{
    public class CatalogController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Account()
        {
            return View();
        }
    }
}
