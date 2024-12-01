using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Queries {
    public record GetEmployeesByCafeQuery (string? Cafe) : IRequest<IEnumerable<GetEmployeeResponse>>;
}