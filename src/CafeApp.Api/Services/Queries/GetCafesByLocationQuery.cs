using System.Collections.Generic;
using CafeApp.Api.Models;
using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Queries {
    public record GetCafesByLocationQuery (string? Location) : IRequest<IEnumerable<GetCafeResponse>>;
}