using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace Reyx.Web.Workshop.Knockout.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/bundles/css").Include(
                        "~/content/site/global.css"));

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/scripts/knockout-{version}.js",
                        "~/scripts/underscore.js",
                        "~/scripts/knockout.mapping-latest.js",
                        "~/scripts/underscore-ko-1.2.2.js",
                        "~/scripts/ko.pager.js",
                        "~/scripts/knockout.validation.js"));

            bundles.Add(new ScriptBundle("~/bundles/globalize").Include(
                        "~/scripts/jquery.globalize/globalize.js",
                        "~/scripts/jquery.globalize/cultures/globalize.sulture.pt-BR.js"));

            bundles.Add(new ScriptBundle("~/bundles/tools").Include(
                        "~/scripts/tools.js"));

            /* Bootstrap */
            bundles.Add(new StyleBundle("~/bundles/bootstrapcss").Include(
                        "~/content/bootstrap/bootstrap.css",
                        "~/content/bootstrap/bootstrap-responsive.css"
                        ));

            bundles.Add(new ScriptBundle("~/bundles/bootstrapjs").Include(
                        "~/scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/view-models").IncludeDirectory(
                        "~/scripts/view-models", "*.js"));

            bundles.Add(new ScriptBundle("~/bundles/apply-bindings").Include(
                        "~/scripts/apply-bindings.js"));

            bundles.Add(new ScriptBundle("~/bundles/auth").Include(
                        "~/scripts/app/auth.js"));

            bundles.Add(new ScriptBundle("~/bundles/blog").Include(
                        "~/scripts/app/blog.js"));

            bundles.Add(new ScriptBundle("~/bundles/todoes").Include(
                        "~/scripts/app/todoes.js"));

            // BundleTable.EnableOptimizations = true;
        }
    }
}