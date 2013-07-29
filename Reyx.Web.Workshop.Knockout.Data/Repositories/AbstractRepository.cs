using System;
using System.Data;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity.Infrastructure;
using Reyx.Web.Workshop.Knockout.Data.Models;
using Reyx.Web.Workshop.Knockout.Data.Interfaces;

namespace Reyx.Web.Workshop.Knockout.Data.Repositories
{
    public class AbstractRepository<T> : IRepository<T> where T : class, IEntity
    {
        private ProjectDataContext context;
        public ProjectDataContext Context
        {
            get 
            {
                if (this.context == null)
                    this.context = new ProjectDataContext();
                return this.context;
            }
            set 
            {
                this.context = value;
            }
        }
        
        public IQueryable<T> All
        {
            get { return Context.Set<T>(); }
        }

        public IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public T FindIncluding(int id, params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = Context.Set<T>();
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }

            return query.Where(g => g.Id == id).FirstOrDefault();
        }

        public T Find(int id)
        {
            return Context.Set<T>().Find(id);
        }

        public void InsertOrUpdate(T entity)
        {
            if (entity.Id == 0)
            {
                Context.Set<T>().Add(entity);
            }
            else
            {
                DbEntityEntry entityEntry = Context.Entry(entity);
                if (entityEntry.State == EntityState.Detached)
                {
                    Context.Set<T>().Attach(entity);
                    entityEntry.State = EntityState.Modified;
                }
            }
        }

        public void Delete(T entity)
        {
            Context.Set<T>().Remove(entity);
        }

        public void Save()
        {
            Context.SaveChanges();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}
