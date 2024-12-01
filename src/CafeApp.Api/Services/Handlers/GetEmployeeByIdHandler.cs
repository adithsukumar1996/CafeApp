using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using CafeApp.Api.Models.DTO;
using CafeApp.Api.Queries;
using MediatR;
using SqlKata.Execution;

namespace CafeApp.Api.Handlers {
    public class GetEmployeeByIdHandler : IRequestHandler<GetEmployeeByIdQuery, GetEmployeeResponse?> {
        private readonly ICafeQueryRepository _cafeQueryRepository;
        private readonly IEmployeeQueryRepository _employeeQueryRepository;

        public GetEmployeeByIdHandler (ICafeQueryRepository cafeQueryRepository, IEmployeeQueryRepository employeeQueryRepository) {
            _cafeQueryRepository = cafeQueryRepository;
            _employeeQueryRepository = employeeQueryRepository;
        }

        public async Task<GetEmployeeResponse?> Handle (GetEmployeeByIdQuery request, CancellationToken cancellationToken) {
            var query = _employeeQueryRepository.Get ("Employee")
                .Join ("Cafe", "Cafe.pId", "Employee.CafeId")
                .Where ("Employee.id", request.id)
                .Select ("Employee.id as Id",
                    "Employee.name as Name",
                    "Employee.EmailAddress as EmailAddress",
                    "Employee.PhoneNumber as PhoneNumber",
                    "Employee.Gender as Gender",
                    "Cafe.Name as Cafe",
                    "Cafe.Id as CafeId",
                    "Employee.startDate as StartDate")
                .OrderBy ("Employee.startDate");
            var result = (await query.GetAsync<GetEmployeeResponse> ()).Select (x => x with {
                DaysWorked = (DateTime.UtcNow - x.StartDate).Days
            }).FirstOrDefault ();
            return result;
        }
    }
}