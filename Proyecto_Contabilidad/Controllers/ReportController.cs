using Microsoft.AspNetCore.Mvc;

namespace Proyecto_Contabilidad.Controllers
{
    public class ReportController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Balance()
        {
            return View();
        }
    }
}
