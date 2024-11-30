using System.ComponentModel.DataAnnotations;
using CafeApp.Api.Validation;

namespace CafeApp.Api.Models.DTO {
    public record AddCafeRequest {
        [Required]
        [StringLength (10, MinimumLength = 6, ErrorMessage = "Name must be between 6 and 10 characters.")]
        public required string Name { get; init; }

        [Required]
        [StringLength (256, ErrorMessage = "Description cannot exceed 256 characters.")]
        public required string Description { get; init; }

        [Base64ImageSize (2 * 1024 * 1024, ErrorMessage = "Image size cannot exceed 2 MB.")]
        public string? LogoBase64 { get; init; }

        [Required]
        public required string Location { get; init; }
    }
}