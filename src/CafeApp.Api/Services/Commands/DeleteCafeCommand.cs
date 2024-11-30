using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Commands {
    public record DeleteCafeCommand (DeleteCafeRequest request) : IRequest<string>;
}