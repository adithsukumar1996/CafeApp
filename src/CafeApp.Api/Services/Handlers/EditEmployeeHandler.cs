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
    public class EditEmployeeHandler : IRequestHandler<EditEmployeeCommand, string> {
        private readonly EmployeeCommandRepository _employeeCommandRepository;
        private readonly EmployeeQueryRepository _employeeQueryRepository;
        private readonly CafeQueryRepository _cafeQueryRepository;

        public EditEmployeeHandler (EmployeeCommandRepository employeeCommandRepository, EmployeeQueryRepository employeeQueryRepository, CafeQueryRepository cafeQueryRepository) {
            _employeeCommandRepository = employeeCommandRepository;
            _employeeQueryRepository = employeeQueryRepository;
            _cafeQueryRepository = cafeQueryRepository;
        }

        public async Task<string> Handle (EditEmployeeCommand command, CancellationToken cancellationToken) {
            var id = command.request.Id;
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                var existingEmployee = await _employeeQueryRepository.GetEmployeeeByIdAsync (id);
                if (existingEmployee == null) {
                    throw new ArgumentException ("Invalid employee ID.");
                }
                var validCafe = await _cafeQueryRepository.GetCafeByIdAsync (command.request.AssignedCafe);
                if (validCafe == null) {
                    throw new ArgumentException ("Invalid cafe ID.");
                }
                var employee = existingEmployee with {
                    CafeId = validCafe.Pid,
                    EmailAddress = command.request.Email,
                    Gender = command.request.Gender,
                    Name = command.request.Name,
                    PhoneNumber = command.request.PhoneNumber,
                };
                await _employeeCommandRepository.UpdateAsync (employee);
                scope.Complete ();
            }
            return id;

        }
    }
}