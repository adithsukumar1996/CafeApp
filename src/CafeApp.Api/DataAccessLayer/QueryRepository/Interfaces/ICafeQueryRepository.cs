using CafeApp.Api.Models;

namespace CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces {
    public interface ICafeQueryRepository : IBaseQueryRepository<Cafe> {
        Task<Cafe> GetCafeByIdAsync (string id);
    }
}