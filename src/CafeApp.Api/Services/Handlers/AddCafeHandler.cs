using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using CafeApp.Api.Commands;
using CafeApp.Api.DataAccessLayer.CommandRepository;
using CafeApp.Api.Models;
using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Handlers {
    public class AddCafeHandler : IRequestHandler<AddCafeCommand, Guid> {
        private readonly CafeCommandRepository _cafeCommandRepository;

        public AddCafeHandler (CafeCommandRepository cafeCommandRepository) {
            _cafeCommandRepository = cafeCommandRepository;
        }

        public async Task<Guid> Handle (AddCafeCommand command, CancellationToken cancellationToken) {
            var guid = Guid.NewGuid ();
            var cafe = new Cafe {
                Id = guid,
                Description = command.request.Description,
                Logo = command.request.LogoBase64 != null ? Convert.FromBase64String (command.request.LogoBase64) : null,
                Location = command.request.Location,
                Name = command.request.Name,
                CreatedTime = DateTime.UtcNow
            };
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                await _cafeCommandRepository.InsertAsync (cafe);
                scope.Complete ();
            }
            return guid;

        }
    }
}