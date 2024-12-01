using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace CafeApp.Api.Validation {
    public class Base64ImageSizeAttribute : ValidationAttribute {
        private readonly int _maxFileSizeInBytes;

        public Base64ImageSizeAttribute (int maxFileSizeInBytes) {
            _maxFileSizeInBytes = maxFileSizeInBytes;
        }

        protected override ValidationResult? IsValid (object? value, ValidationContext validationContext) {
            if (value is not string base64String || string.IsNullOrEmpty (base64String)) {
                return ValidationResult.Success;
            }

            try {
                // Remove data URL scheme if present
                var base64Data = Regex.Replace (base64String, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);
                var fileBytes = Convert.FromBase64String (base64Data);

                if (fileBytes.Length > _maxFileSizeInBytes) {
                    return new ValidationResult ($"Image size cannot exceed {_maxFileSizeInBytes / (1024 * 1024)} MB.");
                }
            } catch (FormatException) {
                return new ValidationResult ("Invalid Base64 string.");
            }

            return ValidationResult.Success;
        }
    }
}