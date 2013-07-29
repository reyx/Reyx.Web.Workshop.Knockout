namespace Reyx.Web.Workshop.Knockout.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TodoChangeDecriptionToContent : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Todoes", "Content", c => c.String());
            DropColumn("dbo.Todoes", "Description");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Todoes", "Description", c => c.String());
            DropColumn("dbo.Todoes", "Content");
        }
    }
}
