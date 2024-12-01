using System.Data;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.Models;

namespace CafeApp.Api.DataAccessLayer.CommandRepository {
    public class EmployeeCommandRepository : BaseCommandRepository<Employee>, IEmployeeCommandRepository {
        public EmployeeCommandRepository (IDbConnection dbConnection) : base (dbConnection) { }

    }
}