using System.Collections.Generic;
using CafeApp.Api.Models;
using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Queries {
    public record GetEmployeeByIdQuery (string? id) : IRequest<GetEmployeeResponse?>;
}