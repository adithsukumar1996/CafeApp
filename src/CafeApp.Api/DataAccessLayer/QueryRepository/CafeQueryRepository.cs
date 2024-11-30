using CafeApp.Api.Models;
using SqlKata.Execution;

namespace CafeApp.Api.DataAccessLayer.QueryRepository {
    public class CafeQueryRepository : BaseQueryRepository<Cafe> {
        public CafeQueryRepository (QueryFactory queryFactory) : base (queryFactory) { }

        public async Task<Cafe> GetCafeByIdAsync (Guid id) {
            return await _queryFactory.Query ("Cafe").Where ("Id", id).FirstOrDefaultAsync<Cafe> ();
        }

    }
}