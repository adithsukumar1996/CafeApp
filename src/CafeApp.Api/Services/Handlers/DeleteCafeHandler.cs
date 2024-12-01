using System.Transactions;
using CafeApp.Api.Commands;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using MediatR;

namespace CafeApp.Api.Handlers {
    public class DeleteCafeHandler : IRequestHandler<DeleteCafeCommand, string> {
        private readonly ICafeCommandRepository _cafeCommandRepository;
        private readonly ICafeQueryRepository _cafeQueryRepository;

        public DeleteCafeHandler (ICafeCommandRepository cafeCommandRepository, ICafeQueryRepository cafeQueryRepository) {
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