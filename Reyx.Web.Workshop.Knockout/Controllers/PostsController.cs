using Reyx.Web.Workshop.Knockout.Data.Entities;
using Reyx.Web.Workshop.Knockout.Data.Repositories;
using Reyx.Web.Workshop.Knockout.Models;
using System;
using System.Linq;
using System.Web.Mvc;

namespace Reyx.Web.Workshop.Knockout.Controllers
{
    public class PostsController : BaseController
    {
        private readonly PostRepository postRepository;

        public PostsController()
            : this(new PostRepository())
        {
        }

        public PostsController(PostRepository postRepository)
        {
            this.postRepository = postRepository;
        }

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Edit(Post model)
        {
            try
            {
                model.UserId = Settings.User.Id;

                postRepository.InsertOrUpdate(model);
                postRepository.Save();

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

        public JsonResult List(int id, int index)
        {
            try
            {
                var model = postRepository
                    .All
                    .OrderByDescending(t => t.Date)
                    .Skip(index)
                    .Take(10)
                    .Select(t => new
                    {
                        t.Content,
                        t.Date,
                        t.Id,
                        Comments = t.Comments.OrderByDescending(c => c.Date).Take(5).Select(c => new
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
                        }),
                        TotalComments = t.Comments.Count,
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
