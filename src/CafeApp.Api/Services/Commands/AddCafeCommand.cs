using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Commands {
    public record AddCafeCommand (AddCafeRequest request) : IRequest<Guid>;
}