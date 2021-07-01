using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Dtos;
using USAble_Services.Extensions;
using USAble_Services.Interfaces;
using USAble_Web.Helpers;

namespace USAble_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private IMenuItemService _menuItemService;

        public MenuItemController(IMenuItemService menuItemService)
        {
            _menuItemService = menuItemService;
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var response = new Response();

            try
            {
                var menuItem = _menuItemService.GetById(id);

                var menuItemDto = new MenuItemDto(menuItem);

                response.success = true;
                response.payload = menuItemDto;

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
        public IActionResult GetAll()
        {
            var response = new Response();

            try
            {
                var menuItems = _menuItemService.GetAll();

                var menuItemsDto = new List<MenuItemDto>();

                foreach (var menuItem in menuItems)
                {
                    menuItemsDto.Add(new MenuItemDto(menuItem));
                }

                response.success = true;
                response.payload = menuItemsDto;

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
        public IActionResult Create(MenuItems menuItem)
        {
            var response = new Response();

            try
            {
                var menuItemResponse = _menuItemService.Create(menuItem);

                if (menuItemResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = menuItemResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new MenuItemDto(menuItemResponse.menuItem);

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
        public IActionResult Update(MenuItems menuItem)
        {
            var response = new Response();

            try
            {
                var menuItemResponse = _menuItemService.Update(menuItem);

                if (menuItemResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = menuItemResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new MenuItemDto(menuItemResponse.menuItem);

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
        public IActionResult Delete(MenuItems menuItem)
        {
            var response = new Response();

            try
            {
                var menuItemResponse = _menuItemService.Delete(menuItem);

                if (menuItemResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = menuItemResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new MenuItemDto(menuItemResponse.menuItem);

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
