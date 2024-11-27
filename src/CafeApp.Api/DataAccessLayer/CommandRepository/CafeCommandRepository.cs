using System.Data;
using CafeApp.Api.Models;

namespace CafeApp.Api.DataAccessLayer.CommandRepository {
    public class CafeCommandRepository : BaseCommandRepository<Cafe> {
        public CafeCommandRepository (IDbConnection dbConnection) : base (dbConnection) { }
    }
}