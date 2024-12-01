using System.Transactions;
using CafeApp.Api.Commands;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.Models;
using MediatR;

namespace CafeApp.Api.Handlers {
    public class AddCafeHandler : IRequestHandler<AddCafeCommand, Guid> {
        private readonly ICafeCommandRepository _cafeCommandRepository;

        public AddCafeHandler (ICafeCommandRepository cafeCommandRepository) {
            _cafeCommandRepository = cafeCommandRepository;
        }

        public async Task<Guid> Handle (AddCafeCommand command, CancellationToken cancellationToken) {
            var guid = Guid.NewGuid ();
            var cafe = new Cafe {
                Id = guid.ToString (),
                Description = command.request.Description,
                Logo = command.request.LogoBase64,
                Location = command.request.Location,
                Name = command.request.Name,
                CreatedDate = DateTime.UtcNow
            };
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                await _cafeCommandRepository.InsertAsync (cafe);
                scope.Complete ();
            }
            return guid;

        }
    }
}