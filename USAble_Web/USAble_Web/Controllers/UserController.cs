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
            var response = _userService.GetById(id);

            if (response == null)
                return BadRequest(new { message = "Specified user was not found" });

            return Ok(response);
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var response = new Response();

            try
            {
                var users = _userService.GetAll();

                var usersDto = new List<UserDto>();

                foreach (var user in users)
                {
                    usersDto.Add(new UserDto(user));
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
        [HttpPost("Create")]
        public IActionResult Create(UserRequest request)
        {
            var response = new Response();

            try
            {
                var userResponse = _userService.Create(request.User, request.Password);

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
        [HttpPost("Update")]
        public IActionResult Update(UserRequest request)
        {
            var response = new Response();

            try
            {
                var userResponse = _userService.Update(request.User, request.Password);

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
    }
}
