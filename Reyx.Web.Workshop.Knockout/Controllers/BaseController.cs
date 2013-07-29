using Reyx.Web.Workshop.Knockout.Data.Entities;
using Reyx.Web.Workshop.Knockout.Data.Repositories;
using System;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Reyx.Web.Workshop.Knockout.Controllers
{
    public class BaseController : Controller
    {
        private readonly UserRepository userRepository;

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            bool logged = Settings.User != null;

            if (!logged)
            {
                if (!userRepository.All.Any())
                {
                    userRepository.InsertOrUpdate(new User()
                    {
                        Name = "adm",
                        Email = "a@a.com",
                        Password = UserRepository.EncryptPassword("123"),
                        Avatar = ""
                    });

                    userRepository.Save();
                }

                if (filterContext.HttpContext.Request.IsAjaxRequest())
                {
                    filterContext.HttpContext.Response.Clear();
                    filterContext.HttpContext.Response.StatusCode = (int)HttpStatusCode.Forbidden;

                    filterContext.Result = new JsonResult
                    {
                        Data = new HttpUnauthorizedResult(),
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                }
                else
                {
                    filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new
                    {
                        controller = "auth",
                        action = "index"
                    }));
                }
            }
        }

        public BaseController()
            : this(new UserRepository())
        {
        }

        public BaseController(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                userRepository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
