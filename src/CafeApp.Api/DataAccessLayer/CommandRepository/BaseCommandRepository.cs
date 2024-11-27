using System.Data;
using System.Threading.Tasks;
using Dapper.Contrib.Extensions;

namespace CafeApp.Api.DataAccessLayer {
    public abstract class BaseCommandRepository<T> where T : class {
        protected readonly IDbConnection _dbConnection;

        protected BaseCommandRepository (IDbConnection dbConnection) {
            _dbConnection = dbConnection;
        }

        public virtual async Task<long> InsertAsync (T entity) {
            return await _dbConnection.InsertAsync (entity);
        }

        public virtual async Task<bool> UpdateAsync (T entity) {
            return await _dbConnection.UpdateAsync (entity);
        }

        public virtual async Task<bool> DeleteAsync (T entity) {
            return await _dbConnection.DeleteAsync (entity);
        }

    }
}