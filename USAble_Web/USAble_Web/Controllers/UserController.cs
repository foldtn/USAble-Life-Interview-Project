using Microsoft.AspNetCore.Mvc;
using USAble_Data;
using USAble_Data.Models.Requests;
using USAble_Services.Interfaces;
using USAble_Web.Helpers;

namespace USAble_Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Authenticate")]
        public IActionResult Authenticate(AuthenticateRequest request)
        {
            var response = _userService.Authenticate(request);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var response = _userService.GetById(id);

            if (response == null)
                return BadRequest(new { message = "Specified user was not found" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var response = _userService.GetAll();

            if (response == null)
                return BadRequest(new { message = "No users found" });

            return Ok(response);
        }

        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(UserRequest request)
        {
            var response = _userService.Create(request.User, request.Password);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.user);
        }

        [Authorize]
        [HttpPost("Update")]
        public IActionResult Update(Users user)
        {
            var response = _userService.Update(user);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.user);
        }

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete(Users user)
        {
            var response = _userService.Delete(user);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok();
        }
    }
}
