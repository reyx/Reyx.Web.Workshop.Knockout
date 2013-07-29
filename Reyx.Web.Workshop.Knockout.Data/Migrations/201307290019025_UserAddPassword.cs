namespace Reyx.Web.Workshop.Knockout.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserAddPassword : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Users", "Password", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Users", "Password");
        }
    }
}
