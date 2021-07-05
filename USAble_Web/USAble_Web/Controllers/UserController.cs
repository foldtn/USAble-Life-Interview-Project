using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Dtos;
using USAble_Data.Models.Requests;
using USAble_Services.Extensions;
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
            var response = new Response();

            try
            {
                var user = _userService.GetById(id);

                var role = _userService.GetUserRoleById(user.UserRoleId);
                var userDto = new UserDto(user, role);

                response.success = true;
                response.payload = userDto;

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll(int currentUserId)
        {
            var response = new Response();

            try
            {
                var users = _userService.GetAll(currentUserId);

                var usersDto = new List<UserDto>();

                foreach (var user in users)
                {
                    var role = _userService.GetUserRoleById(user.UserRoleId);
                    usersDto.Add(new UserDto(user, role));
                }

                response.success = true;
                response.payload = usersDto;

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpGet("GetRoles")]
        public IActionResult GetRoles()
        {
            var response = new Response();

            try
            {
                var roles = _userService.GetUserRoles();

                var rolesDto = new List<UserRoleDto>();

                foreach (var role in roles)
                {
                    rolesDto.Add(new UserRoleDto(role));
                }

                response.success = true;
                response.payload = rolesDto;

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpGet("GetAllUsernames")]
        public IActionResult GetAllUsernames()
        {
            var response = new Response();

            try
            {
                response.success = true;
                response.payload = _userService.GetAllUsernames();

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(Users user)
        {
            var response = new Response();

            try
            {
                var userResponse = _userService.Create(user);

                if (userResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = userResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                var role = _userService.GetUserRoleById(userResponse.user.UserRoleId);

                response.payload = new UserDto(userResponse.user, role, userResponse.randomPassword);

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpPost("Update")]
        public IActionResult Update(Users user)
        {
            var response = new Response();

            try
            {
                var userResponse = _userService.Update(user);

                if (userResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = userResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new UserDto(userResponse.user);

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete(Users user)
        {
            var response = new Response();

            try
            {
                var userResponse = _userService.Delete(user);

                if (userResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = userResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new UserDto(userResponse.user);

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword(UserRequest request)
        {
            var response = new Response();

            try
            {
                var userResponse = _userService.ResetPassword(request);

                if (userResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = userResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new UserDto(userResponse.user);

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [Authorize]
        [HttpPost("GenerateRandomPassword")]
        public IActionResult GenerateRandomPassword(Users user)
        {
            var response = new Response();

            try
            {
                var request = new UserRequest(user);
                var userResponse = _userService.ResetPassword(request);

                if (userResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = userResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new UserDto(userResponse.user, userResponse.randomPassword);

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }
    }
}
