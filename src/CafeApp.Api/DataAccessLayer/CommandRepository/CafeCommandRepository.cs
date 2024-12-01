using System.Data;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.Models;

namespace CafeApp.Api.DataAccessLayer.CommandRepository {
    public class CafeCommandRepository : BaseCommandRepository<Cafe>, ICafeCommandRepository {
        public CafeCommandRepository (IDbConnection dbConnection) : base (dbConnection) { }
    }
}