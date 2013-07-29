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
    public class CommentsController : BaseController
    {
        private readonly CommentRepository commentRepository;

        public CommentsController()
            : this(new CommentRepository())
        {
        }

        public CommentsController(CommentRepository commentRepository)
        {
            this.commentRepository = commentRepository;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Edit(Comment model)
        {
            try
            {
                model.UserId = Settings.User.Id;

                commentRepository.InsertOrUpdate(model);
                commentRepository.Save();

                return Json(new Response()
                {
                    id = model.Id,
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

        public JsonResult ByPost(int id, int index)
        {
            try
            {
                var model = commentRepository
                    .All
                    .Where(t => t.PostId == id)
                    .OrderByDescending(t => t.Date)
                    .Skip(index)
                    .Take(10)
                    .Select(t => new
                    {
                        t.Content,
                        t.Date,
                        t.Id,
                        Post = new { },
                        User = new
                        {
                            t.User.Id,
                            t.User.Avatar,
                            t.User.Email,
                            t.User.Name
                        }
                    });

                return Json(new Response()
                {
                    data = model,
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
    }
}
