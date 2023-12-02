using Microsoft.AspNetCore.Mvc;

namespace Proyecto_Contabilidad.Controllers
{
    public class LogController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
