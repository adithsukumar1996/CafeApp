using CafeApp.Api.Commands;
using CafeApp.Api.Common;
using CafeApp.Api.Models.DTO;
using CafeApp.Api.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CafeApp.Api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase {
        private readonly IMediator _mediator;

        public EmployeeController (IMediator mediator) {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCafeResponse>>> GetEmployeesByCafe ([FromQuery] string? cafe) {
            var query = new GetEmployeesByCafeQuery (cafe);
            var employess = await _mediator.Send (query);
            return Ok (employess);
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<GetEmployeeResponse?>> GetEmployeeById ([FromRoute] string id) {
            var query = new GetEmployeeByIdQuery (id);
            var cafe = await _mediator.Send (query);
            return Ok (cafe);
        }

        [HttpPost]
        public async Task<ActionResult<BaseCommandResponse>> AddEmployee ([FromBody] AddEmployeeRequest request) {
            var command = new AddEmployeeCommand (request);
            var result = await _mediator.Send (command);
            return CreatedAtAction (nameof (AddEmployee), new BaseCommandResponse { Id = result.ToString () });
        }

        [HttpPut]
        public async Task<ActionResult<BaseCommandResponse>> EditEmployee ([FromBody] EditEmployeeRequest request) {
            var command = new EditEmployeeCommand (request);
            var result = await _mediator.Send (command);
            return Ok (new BaseCommandResponse { Id = result.ToString () });
        }

        [HttpDelete ("{id}")]
        public async Task<ActionResult<BaseCommandResponse>> DeleteEmployee ([FromRoute] string id) {
            var request = new DeleteEmployeeRequest { Id = id };
            var command = new DeleteEmployeeCommand (request);
            var result = await _mediator.Send (command);
            return Ok (new BaseCommandResponse { Id = result.ToString () });
        }

    }
}