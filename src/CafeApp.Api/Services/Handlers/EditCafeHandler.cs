using System.Threading;
using System.Threading.Tasks;
using System.Transactions;
using CafeApp.Api.Commands;
using CafeApp.Api.DataAccessLayer.CommandRepository;
using CafeApp.Api.DataAccessLayer.QueryRepository;
using CafeApp.Api.Models;
using CafeApp.Api.Models.DTO;
using MediatR;

namespace CafeApp.Api.Handlers {
    public class EditCafeHandler : IRequestHandler<EditCafeCommand, Guid> {
        private readonly CafeCommandRepository _cafeCommandRepository;
        private readonly CafeQueryRepository _cafeQueryRepository;

        public EditCafeHandler (CafeCommandRepository cafeCommandRepository, CafeQueryRepository cafeQueryRepository) {
            _cafeCommandRepository = cafeCommandRepository;
            _cafeQueryRepository = cafeQueryRepository;
        }

        public async Task<Guid> Handle (EditCafeCommand command, CancellationToken cancellationToken) {
            var guid = new Guid (command.request.Id);
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                var existingCafe = await _cafeQueryRepository.GetCafeByIdAsync (guid);
                if (existingCafe == null) {
                    throw new ArgumentException ("Invalid Cafe ID.");
                }
                var cafe = existingCafe with {
                    Id = guid,
                    Description = command.request.Description,
                    Logo = command.request.LogoBase64 != null ? Convert.FromBase64String (command.request.LogoBase64) : null,
                    Location = command.request.Location,
                    Name = command.request.Name
                };
                await _cafeCommandRepository.UpdateAsync (cafe);
                scope.Complete ();
            }
            return guid;

        }
    }
}