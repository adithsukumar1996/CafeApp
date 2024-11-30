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
    public class DeleteCafeHandler : IRequestHandler<DeleteCafeCommand, string> {
        private readonly CafeCommandRepository _cafeCommandRepository;
        private readonly CafeQueryRepository _cafeQueryRepository;

        public DeleteCafeHandler (CafeCommandRepository cafeCommandRepository, CafeQueryRepository cafeQueryRepository) {
            _cafeCommandRepository = cafeCommandRepository;
            _cafeQueryRepository = cafeQueryRepository;
        }

        public async Task<string> Handle (DeleteCafeCommand command, CancellationToken cancellationToken) {
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                var cafe = await _cafeQueryRepository.GetCafeByIdAsync (command.request.Id);
                if (cafe != null) {
                    await _cafeCommandRepository.DeleteAsync (cafe);
                }
                scope.Complete ();
            }
            return command.request.Id;
        }
    }
}