using CafeApp.Api.Commands;
using CafeApp.Api.Common;
using CafeApp.Api.Models.DTO;
using CafeApp.Api.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CafeApp.Api.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CafeController : ControllerBase {
        private readonly IMediator _mediator;

        public CafeController (IMediator mediator) {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetCafeResponse>>> GetCafesByLocation ([FromQuery] string? location) {
            var query = new GetCafesByLocationQuery (location);
            var cafes = await _mediator.Send (query);
            return Ok (cafes);
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<GetCafeResponse?>> GetCafeById ([FromRoute] string id) {
            var query = new GetCafeByIdQuery (id);
            var cafe = await _mediator.Send (query);
            return Ok (cafe);
        }

        [HttpPost]
        public async Task<ActionResult<BaseCommandResponse>> AddCafe ([FromBody] AddCafeRequest request) {
            var command = new AddCafeCommand (request);
            var result = await _mediator.Send (command);
            return CreatedAtAction (nameof (AddCafe), new BaseCommandResponse { Id = result.ToString () });
        }

        [HttpPut]
        public async Task<ActionResult<BaseCommandResponse>> EditCafe ([FromBody] EditCafeRequest request) {
            var command = new EditCafeCommand (request);
            var result = await _mediator.Send (command);
            return Ok (new BaseCommandResponse { Id = result.ToString () });
        }

        [HttpDelete ("{id}")]
        public async Task<ActionResult<BaseCommandResponse>> DeleteCafe ([FromRoute] string id) {
            var request = new DeleteCafeRequest { Id = id };
            var command = new DeleteCafeCommand (request);
            var result = await _mediator.Send (command);
            return Ok (new BaseCommandResponse { Id = result.ToString () });
        }

    }
}