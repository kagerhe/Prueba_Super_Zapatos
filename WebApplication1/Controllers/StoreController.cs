using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class StoreController : Controller
    {
        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

         public ActionResult Add()
        {
                    
            return View();
        }
        public ActionResult Store()
        {
            Tienda tienda = new Tienda();
            List<Store> lista = tienda.ListarTodos();
            ViewBag.Lista = lista;
            return View();
        }

        public ActionResult Edit(int id)
        {
            Tienda tienda = new Tienda();
            Store store = tienda.Editar(id);
            ViewBag.data = store;

            return View(store);
        }

        public ActionResult Save(int Id,Store store) {

            Tienda tienda = new Tienda();
            bool stores = tienda.Guardar(Id,store);
            if (stores)
            {
                ViewBag.respuesta = "Store add success";
                ViewBag.success = store;
                return Redirect("Store");
            }
            ViewBag.respuesta = "An error occurred when adding a new store";
            ViewBag.success = store;
            return RedirectToAction("Edit",new { id=Id });
        }

        public ActionResult Delete(int Id)
        {

            Tienda arti = new Tienda();
            bool artic = arti.Eliminar(Id);
            return RedirectToAction("Store");

        }

        public ActionResult SaveForm(Store model)
        {
            Tienda modelart = new Tienda();
            bool resultado = modelart.GuardarTienda(model);
            return RedirectToAction("Store");
        }

    }
}