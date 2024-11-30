using System;

namespace CafeApp.Api.Models.DTO {
    public record GetEmployeeResponse {
        public required string Id { get; init; }
        public required string Name { get; init; }
        public required string EmailAddress { get; init; }
        public required string PhoneNumber { get; init; }
        public required int DaysWorked { get; init; }
        public required string Cafe { get; init; }
        public required string CafeId { get; init; }
        public required DateTime StartDate { get; init; }
        public required string Gender { get; init; }
    }
}