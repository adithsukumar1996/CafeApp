using System.Data;
using CafeApp.Api.DataAccessLayer;
using CafeApp.Api.Models;

namespace CafeApp.Api.DataAccessLayer.CommandRepository {
    public class EmployeeCommandRepository : BaseCommandRepository<Employee> {
        public EmployeeCommandRepository (IDbConnection dbConnection) : base (dbConnection) { }

    }
}