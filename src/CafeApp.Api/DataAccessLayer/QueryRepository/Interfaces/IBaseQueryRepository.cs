using SqlKata;

namespace CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces {
    public interface IBaseQueryRepository<T> where T : class {
        Query Get (string? alias = null);
    }
}