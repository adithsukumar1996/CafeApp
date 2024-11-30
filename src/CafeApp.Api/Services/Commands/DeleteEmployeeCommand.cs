using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Commands {
    public record DeleteEmployeeCommand (DeleteEmployeeRequest request) : IRequest<string>;
}