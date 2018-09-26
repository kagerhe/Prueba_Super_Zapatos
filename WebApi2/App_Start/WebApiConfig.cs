using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WebApi2
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web

            // Rutas de API web
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "services/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Routes.MapHttpRoute(
              name: "ServicesApi",
              routeTemplate: "Services/{controller}/{action}/{id}",
              defaults: new { controller = "Article", action = "GetValue", id = RouteParameter.Optional }

          );
           
        }
    }
}
