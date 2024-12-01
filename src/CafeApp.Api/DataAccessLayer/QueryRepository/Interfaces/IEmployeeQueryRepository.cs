using CafeApp.Api.Models;

namespace CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces {
    public interface IEmployeeQueryRepository : IBaseQueryRepository<Employee> {
        Task<Employee> GetEmployeeeByIdAsync (string id);
        Task<Employee> GetMostRecentEmployee ();
    }
}