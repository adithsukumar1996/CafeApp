using Dapper.Contrib.Extensions;

namespace CafeApp.Api.Models {
    public abstract record BaseModel {
        [Key]
        public int Pid { get; init; }
        public string? CreatedBy { get; init; }
        public string? ModifiedBy { get; init; }
        public required DateTime CreatedTime { get; init; }
        private DateTime _modifiedTime;
        public DateTime ModifiedTime {
            get => _modifiedTime;
            init => _modifiedTime = DateTime.UtcNow;
        }
    }
}