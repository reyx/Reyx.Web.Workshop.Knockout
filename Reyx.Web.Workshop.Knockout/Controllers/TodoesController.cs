using Reyx.Web.Workshop.Knockout.Data.Entities;
using Reyx.Web.Workshop.Knockout.Data.Repositories;
using Reyx.Web.Workshop.Knockout.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;


namespace Reyx.Web.Workshop.Knockout.Controllers
{
    public class TodoesController : BaseController
    {
        private readonly TodoRepository todoRepository;

        public TodoesController()
            : this(new TodoRepository())
        {
        }

        public TodoesController(TodoRepository todoRepository)
        {
            this.todoRepository = todoRepository;
        }

        public ActionResult Index()
        {
            ViewBag.Todoes = new JavaScriptSerializer().Serialize(todoRepository.All.Where(t => t.Visible && t.UserId == Settings.User.Id).OrderByDescending(t => t.Created).Select(t => new { 
                t.Content,
                t.Created,
                t.Done,
                t.Id,
                t.Visible
            }));

            return View();
        }

        // public JsonResult All()
        // {
        //     try
        //     {
        //         var model = todoRepository.All.Where(t => t.Visible).OrderByDescending(t => t.Created);
           
        //         return Json(new Response()
        //         {
        //             data = model,
        //             result = true
        //         }, JsonRequestBehavior.AllowGet);
        //     }
        //     catch (Exception ex)
        //     {
        //         return Json(new Response()
        //         {
        //             error = new[] { ex.Message },
        //             result = false
        //         }, JsonRequestBehavior.AllowGet);
        //     }
        // }

        public JsonResult Edit(Todo model)
        {
            try
            {
                model.Visible = true;
                model.UserId = Settings.User.Id;

                todoRepository.InsertOrUpdate(model);
                todoRepository.Save();

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

        public JsonResult ChangeStatus(int id)
        {
            try
            {
                var model = todoRepository.Find(id);

                if (model == null)
                    throw new Exception("Todo nao localizado.");

                model.Done = !model.Done;
                todoRepository.InsertOrUpdate(model);
                todoRepository.Save();

                return Json(new Response()
                {
                    id = id,
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

        public JsonResult ClearDone(int[] ids)
        {
            try
            {
                foreach (int id in ids)
                {
                    var model = todoRepository.Find(id);

                    if (model == null)
                        throw new Exception("Falha ao localizar a tarefa.");

                    model.Visible = false;
                    todoRepository.InsertOrUpdate(model);
                }

                todoRepository.Save();

                return Json(new Response()
                {
                    data = ids,
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
                this.todoRepository.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
