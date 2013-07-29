using Reyx.Web.Workshop.Knockout.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace Reyx.Web.Workshop.Knockout.Controllers
{
    public class BlogController : Controller
    {
        private readonly PostRepository postRepository;

        public BlogController()
            : this(new PostRepository())
        {
        }

        public BlogController(PostRepository postRepository)
        {
            this.postRepository = postRepository;
        }

        public ActionResult Index()
        {
            var model = postRepository
                    .All
                    .OrderByDescending(t => t.Date)
                    .Take(10)
                    .Select(t => new
                    {
                        t.Title,
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

            ViewBag.Posts = new JavaScriptSerializer().Serialize(model);

            return View();
        }
    }
}
