using System.Transactions;
using CafeApp.Api.Commands;
using CafeApp.Api.DataAccessLayer.CommandRepository.Interfaces;
using CafeApp.Api.DataAccessLayer.QueryRepository.Interfaces;
using CafeApp.Api.Models;
using MediatR;

namespace CafeApp.Api.Handlers {
    public class AddEmployeeHandler : IRequestHandler<AddEmployeeCommand, string> {
        private readonly IEmployeeCommandRepository _employeeCommandRepository;
        private readonly IEmployeeQueryRepository _employeeQueryRepository;
        private readonly ICafeQueryRepository _cafeQueryRepository;

        public AddEmployeeHandler (IEmployeeCommandRepository employeeCommandRepository, IEmployeeQueryRepository employeeQueryRepository, ICafeQueryRepository cafeQueryRepository) {
            _employeeCommandRepository = employeeCommandRepository;
            _employeeQueryRepository = employeeQueryRepository;
            _cafeQueryRepository = cafeQueryRepository;
        }

        public async Task<string> Handle (AddEmployeeCommand command, CancellationToken cancellationToken) {
            var recentEmployee = await _employeeQueryRepository.GetMostRecentEmployee ();
            var newId = recentEmployee != null ? IncrementHexString (recentEmployee.Id) : "UI0000001";
            using (var scope = new TransactionScope (TransactionScopeAsyncFlowOption.Enabled)) {
                var validCafe = await _cafeQueryRepository.GetCafeByIdAsync (command.request.AssignedCafe);
                if (validCafe == null) {
                    throw new ArgumentException ("Invalid cafe ID.");
                }
                var employee = new Employee {
                    CafeId = validCafe.Pid,
                    EmailAddress = command.request.Email,
                    Gender = command.request.Gender,
                    Name = command.request.Name,
                    PhoneNumber = command.request.PhoneNumber,
                    CreatedDate = DateTime.UtcNow,
                    StartDate = DateTime.UtcNow,
                    Id = newId
                };
                await _employeeCommandRepository.InsertAsync (employee);
                scope.Complete ();
            }
            return newId;
        }

        private static string IncrementHexString (string input) {
            if (input.Length != 9 || !input.StartsWith ("UI")) {
                throw new ArgumentException ("Input must be 9 characters long and start with 'UI'.");
            }

            string hexPart = input.Substring (2);
            if (!int.TryParse (hexPart, System.Globalization.NumberStyles.HexNumber, null, out int hexNumber)) {
                throw new ArgumentException ("The last 7 characters must be a valid hexadecimal number.");
            }

            hexNumber++;
            string incrementedHexPart = hexNumber.ToString ("X7");

            return "UI" + incrementedHexPart;
        }
    }
}