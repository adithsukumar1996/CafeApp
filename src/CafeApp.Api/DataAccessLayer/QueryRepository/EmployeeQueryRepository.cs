using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using CafeApp.Api.Models;
using SqlKata.Execution;

namespace CafeApp.Api.DataAccessLayer.QueryRepository {
    public class EmployeeQueryRepository : BaseQueryRepository<Employee>, IEmployeeQueryRepository {
        public EmployeeQueryRepository (QueryFactory queryFactory) : base (queryFactory) { }
        public async Task<Employee> GetEmployeeeByIdAsync (string id) {
            return await _queryFactory.Query ("Employee").Where ("Id", id).FirstOrDefaultAsync<Employee> ();
        }

        public async Task<Employee> GetMostRecentEmployee () {
            return await _queryFactory.Query ("Employee")
                .OrderByDesc ("pId")
                .Limit (1)
                .FirstOrDefaultAsync<Employee> ();
        }

    }
}