using System.Collections.Generic;
using System.Threading.Tasks;
using SqlKata;
using SqlKata.Execution;

namespace CafeApp.Api.DataAccessLayer {
    public abstract class BaseQueryRepository<T> {
        protected readonly QueryFactory _queryFactory;

        protected BaseQueryRepository (QueryFactory queryFactory) {
            _queryFactory = queryFactory;
        }

        public Query Get () {
            return _queryFactory.Query (typeof (T).Name);
        }
    }
}