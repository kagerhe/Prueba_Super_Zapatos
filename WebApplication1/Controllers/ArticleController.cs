using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    public class ArticleController : Controller
    {
        // GET: Article
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Add()
        {
            Tienda store = new Tienda();
            List<Store> lista = store.ListarTodos();
            ViewBag.Lista = lista;
            return View();
        }
        public ActionResult Article()
        {
            Articulo articulo = new Articulo();
            List<Article> lista = articulo.ListarTodos();
            ViewBag.Lista = lista;

            return View();
        }
        
        public ActionResult Edit(int id)
        {
            Articulo articulo = new Articulo();
            Article article = articulo.Editar(id);

            Tienda store = new Tienda();
            List<Store> lista = store.ListarTodos();
            ViewBag.Lista = lista;

            ViewBag.data = article;
            return View(article);
        }

        public ActionResult Save(Article articulo)
        {

            Articulo arti = new Articulo();
            bool articulos = arti.Guardar(articulo.Id, articulo);
            if (articulos)
            {
                ViewBag.respuesta = "Article Add Success";
                ViewBag.success = articulos;
                return Redirect("Article");
            }
            ViewBag.respuesta = "An error occurred when adding a new article";
            ViewBag.success = articulos;
            return RedirectToAction("Edit", new { id = articulo.Id });
        }

        public ActionResult Delete(int Id) {

            Articulo arti = new Articulo();
            bool artic = arti.Eliminar(Id);
            return RedirectToAction("Article");

        }

        public ActionResult SaveForm(Article model)
        {
            Articulo modelart = new Articulo();
            bool resultado = modelart.GuardarArticulo(model);
            return RedirectToAction("Article");
        }
    }
}