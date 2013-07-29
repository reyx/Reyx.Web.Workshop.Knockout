using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Reyx.Web.Workshop.Knockout.Controllers
{
    public class DefaultController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
