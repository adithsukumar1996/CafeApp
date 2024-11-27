using CafeApp.Api.Models;
using SqlKata.Execution;

namespace CafeApp.Api.DataAccessLayer.QueryRepository {
    public class EmployeeQueryRepository : BaseQueryRepository<Employee> {
        public EmployeeQueryRepository (QueryFactory queryFactory) : base (queryFactory) { }

    }
}