using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using CafeApp.Api.Models.DTO;
using CafeApp.Api.Queries;
using MediatR;
using SqlKata.Execution;

namespace CafeApp.Api.Handlers {
    public class GetCafeByIdHandler : IRequestHandler<GetCafeByIdQuery, GetCafeResponse?> {
        private readonly ICafeQueryRepository _cafeQueryRepository;
        private readonly IEmployeeQueryRepository _employeeQueryRepository;

        public GetCafeByIdHandler (ICafeQueryRepository cafeQueryRepository, IEmployeeQueryRepository employeeQueryRepository) {
            _cafeQueryRepository = cafeQueryRepository;
            _employeeQueryRepository = employeeQueryRepository;
        }

        public async Task<GetCafeResponse?> Handle (GetCafeByIdQuery request, CancellationToken cancellationToken) {
            var result = await _cafeQueryRepository.Get ("C").LeftJoin ("Employee as E", "C.pid", "E.CafeId")
                .Where ("C.id", request.id)
                .GroupBy ("C.id", "C.description", "C.logo", "C.location", "C.name")
                .OrderBy ("C.name")
                .SelectRaw (@"C.id as Id ,
                 C.description as Description,
                  C.logo as Logo,
                  C.location as Location,
                  C.name as Name, COUNT(E.id) as Employees")
                .FirstOrDefaultAsync<GetCafeResponse> ();
            return result;
        }
    }
}