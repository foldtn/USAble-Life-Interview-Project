using Microsoft.AspNetCore.Mvc;
using USAble_Data;
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
            var category = _menuItemCategoryService.GetById(id);
            return Ok(category);
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var categories = _menuItemCategoryService.GetAll();
            return Ok(categories);
        }

        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(MenuItemCategories category)
        {
            var response = _menuItemCategoryService.Create(category);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.category);
        }

        [Authorize]
        [HttpPost("Update")]
        public IActionResult Update(MenuItemCategories category)
        {
            var response = _menuItemCategoryService.Update(category);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.category);
        }

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete(MenuItemCategories category)
        {
            var response = _menuItemCategoryService.Delete(category);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok();
        }
    }
}
