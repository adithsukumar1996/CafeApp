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
    public class EditCafeHandler : IRequestHandler<EditCafeCommand, string> {
        private readonly CafeCommandRepository _cafeCommandRepository;
        private readonly CafeQueryRepository _cafeQueryRepository;

        public EditCafeHandler (CafeCommandRepository cafeCommandRepository, CafeQueryRepository cafeQueryRepository) {
            _cafeCommandRepository = cafeCommandRepository;
            _cafeQueryRepository = cafeQueryRepository;
        }

        public async Task<string> Handle (EditCafeCommand command, CancellationToken cancellationToken) {
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                var existingCafe = await _cafeQueryRepository.GetCafeByIdAsync (command.request.Id);
                if (existingCafe == null) {
                    throw new ArgumentException ("Invalid Cafe ID.");
                }
                var cafe = existingCafe with {
                    Description = command.request.Description,
                    Logo = command.request.LogoBase64,
                    Location = command.request.Location,
                    Name = command.request.Name
                };
                await _cafeCommandRepository.UpdateAsync (cafe);
                scope.Complete ();
            }
            return command.request.Id;

        }
    }
}