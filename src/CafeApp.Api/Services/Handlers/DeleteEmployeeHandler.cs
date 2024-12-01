using System.Transactions;
using CafeApp.Api.Commands;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using MediatR;

namespace CafeApp.Api.Handlers {
    public class DeleteEmployeeHandler : IRequestHandler<DeleteEmployeeCommand, string> {
        private readonly IEmployeeCommandRepository _employeeCommandRepository;
        private readonly IEmployeeQueryRepository _employeeQueryRepository;

        public DeleteEmployeeHandler (IEmployeeCommandRepository employeeCommandRepository, IEmployeeQueryRepository employeeQueryRepository) {
            _employeeCommandRepository = employeeCommandRepository;
            _employeeQueryRepository = employeeQueryRepository;
        }
        public async Task<string> Handle (DeleteEmployeeCommand command, CancellationToken cancellationToken) {
            var id = command.request.Id;
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                var employee = await _employeeQueryRepository.GetEmployeeeByIdAsync (id);
                await _employeeCommandRepository.DeleteAsync (employee);
                scope.Complete ();
            }
            return id;

        }
    }
}