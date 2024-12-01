using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using SqlKata;
using SqlKata.Execution;

namespace CafeApp.Api.DataAccessLayer {
    public abstract class BaseQueryRepository<T> : IBaseQueryRepository<T> where T : class {
        protected readonly QueryFactory _queryFactory;

        protected BaseQueryRepository (QueryFactory queryFactory) {
            _queryFactory = queryFactory;
        }

        public virtual Query Get (string? alias = null) {
            var tableName = typeof (T).Name;
            if (!string.IsNullOrEmpty (alias)) {
                tableName += " as " + alias;
            }
            return _queryFactory.Query (tableName);
        }
    }
}