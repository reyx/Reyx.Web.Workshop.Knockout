using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Reyx.Web.Workshop.Knockout.Data.Interfaces
{
    public interface IRepository<T> : IDisposable where T : class
    {
        IQueryable<T> All { get; }
        IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties);
        T Find(int id);
        T FindIncluding(int id, params Expression<Func<T, object>>[] includeProperties);
        void InsertOrUpdate(T entity);
        void Delete(T entity);
        void Save();
    }
}
