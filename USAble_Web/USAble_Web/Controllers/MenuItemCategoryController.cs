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
    public class MenuItemCategoryController : ControllerBase
    {
        private IMenuItemCategoryService _menuItemCategoryService;

        public MenuItemCategoryController(IMenuItemCategoryService menuItemCategoryService)
        {
            _menuItemCategoryService = menuItemCategoryService;
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var response = new Response();

            try
            {
                var category = _menuItemCategoryService.GetById(id);

                var categoryDto = new MenuItemCategoryDto(category);

                response.success = true;
                response.payload = categoryDto;

                return Ok(response.ConvertToJsonObject());
            }
            catch (Exception ex)
            {
                response.success = false;
                response.error = ex.Message;

                return BadRequest(response.ConvertToJsonObject());
            }
        }

        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var response = new Response();

            try
            {
                var categories = _menuItemCategoryService.GetAll();

                var categoriesDto = new List<MenuItemCategoryDto>();

                foreach (var category in categories)
                {
                    categoriesDto.Add(new MenuItemCategoryDto(category));
                }

                response.success = true;
                response.payload = categoriesDto;

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
        public IActionResult Create(MenuItemCategories category)
        {
            var response = new Response();

            try
            {
                var categoryResponse = _menuItemCategoryService.Create(category);

                if (categoryResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = categoryResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new MenuItemCategoryDto(categoryResponse.category);

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
        public IActionResult Update(MenuItemCategories category)
        {
            var response = new Response();

            try
            {
                var categoryResponse = _menuItemCategoryService.Update(category);

                if (categoryResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = categoryResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new MenuItemCategoryDto(categoryResponse.category);

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
        public IActionResult Delete(MenuItemCategories category)
        {
            var response = new Response();

            try
            {
                var categoryResponse = _menuItemCategoryService.Delete(category);

                if (categoryResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = categoryResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new MenuItemCategoryDto(categoryResponse.category);

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
