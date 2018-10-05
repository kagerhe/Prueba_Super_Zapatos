using Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;


namespace WebApplication1.Controllers
{
    public class InicioController : Controller
    {
        // GET: Inicio
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult Store()
        {

            ViewData["Message"] = "Your contact page.";
            return View();
        }

        public ActionResult Article()
        {

            ViewData["Message"] = "Your contact page.";
            return View();
        }
    }
}