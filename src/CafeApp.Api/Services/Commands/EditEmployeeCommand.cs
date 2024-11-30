using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Commands {
    public record EditEmployeeCommand (EditEmployeeRequest request) : IRequest<string>;
}