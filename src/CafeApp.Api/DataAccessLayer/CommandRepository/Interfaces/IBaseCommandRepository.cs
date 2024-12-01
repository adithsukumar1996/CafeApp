namespace CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces {
    public interface IBaseCommandRepository<T> where T : class {
        Task<long> InsertAsync (T entity);
        Task<bool> UpdateAsync (T entity);
        Task<bool> DeleteAsync (T entity);
    }
}