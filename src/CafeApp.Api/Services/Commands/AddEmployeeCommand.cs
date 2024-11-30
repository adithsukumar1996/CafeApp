using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Commands {
    public record AddEmployeeCommand (AddEmployeeRequest request) : IRequest<string>;
}