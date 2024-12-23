using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Queries {
    public record GetCafeByIdQuery (string id) : IRequest<GetCafeResponse?>;
}