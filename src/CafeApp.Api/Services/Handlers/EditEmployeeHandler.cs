using System.Transactions;
using CafeApp.Api.Commands;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using MediatR;

namespace CafeApp.Api.Handlers {
    public class EditEmployeeHandler : IRequestHandler<EditEmployeeCommand, string> {
        private readonly IEmployeeCommandRepository _employeeCommandRepository;
        private readonly IEmployeeQueryRepository _employeeQueryRepository;
        private readonly ICafeQueryRepository _cafeQueryRepository;

        public EditEmployeeHandler (IEmployeeCommandRepository employeeCommandRepository, IEmployeeQueryRepository employeeQueryRepository, ICafeQueryRepository cafeQueryRepository) {
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