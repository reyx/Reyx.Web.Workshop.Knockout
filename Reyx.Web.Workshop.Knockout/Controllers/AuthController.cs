using Reyx.Web.Workshop.Knockout.Data.Entities;
using Reyx.Web.Workshop.Knockout.Data.Repositories;
using Reyx.Web.Workshop.Knockout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Reyx.Web.Workshop.Knockout.Controllers
{
    public class AuthController : Controller
    {
        private readonly UserRepository userRepository;

        public AuthController()
            : this(new UserRepository())
        {
        }

        public AuthController(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Login(string email, string password)
        {
            try
            {
                var user = userRepository.Validate(email, password);

                if (user == null)
                    throw new Exception("Usuário ou senha inválidos.");

                Settings.User = user;

                return Json(new Response()
                {
                    result = true
                }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new Response()
                {
                    errors = ex.GetAllErrMessages(),
                    result = false
                }, JsonRequestBehavior.AllowGet);
            }
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
