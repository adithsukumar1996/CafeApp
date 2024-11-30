using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Commands {
    public record EditCafeCommand (EditCafeRequest request) : IRequest<Guid>;
}