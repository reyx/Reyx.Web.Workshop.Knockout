using Reyx.Web.Workshop.Knockout.Data.Mappings;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace Reyx.Web.Workshop.Knockout.Data
{
    public class ProjectDataContext : DbContext
    {
        // You can add custom code to this file. Changes will not be overwritten.
        // 
        // If you want Entity Framework to drop and regenerate your database
        // automatically whenever you change your model schema, add the following
        // code to the Application_Start method in your Global.asax file.
        // Note: this will destroy and re-create your database with every model change.
        // 
        // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<Reyx.Web.Workshop.Knockout.Data.Models.ReyxWebWorkshopKnockoutDataContext>());

        public ProjectDataContext()
            : base(ConfigurationManager.AppSettings["ConnectionString"])
        {
        }
        
        public DbSet<Reyx.Web.Workshop.Knockout.Data.Entities.Comment> Comments { get; set; }
        public DbSet<Reyx.Web.Workshop.Knockout.Data.Entities.Post> Posts { get; set; }
        public DbSet<Reyx.Web.Workshop.Knockout.Data.Entities.Todo> Todoes { get; set; }
        public DbSet<Reyx.Web.Workshop.Knockout.Data.Entities.User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();

            modelBuilder.Configurations.Add(new CommentMap());
            modelBuilder.Configurations.Add(new PostMap());
            modelBuilder.Configurations.Add(new TodoMap());
            modelBuilder.Configurations.Add(new UserMap());
        }
    }
}