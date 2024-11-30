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
    public class DeleteEmployeeHandler : IRequestHandler<DeleteEmployeeCommand, string> {
        private readonly EmployeeCommandRepository _employeeCommandRepository;
        private readonly EmployeeQueryRepository _employeeQueryRepository;

        public DeleteEmployeeHandler (EmployeeCommandRepository employeeCommandRepository, EmployeeQueryRepository employeeQueryRepository) {
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