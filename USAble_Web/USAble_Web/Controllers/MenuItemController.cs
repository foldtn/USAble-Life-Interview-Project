using Microsoft.AspNetCore.Mvc;
using USAble_Data;
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
            var menuItem = _menuItemService.GetById(id);
            return Ok(menuItem);
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var menuItems = _menuItemService.GetAll();
            return Ok(menuItems);
        }

        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(MenuItems menuItem)
        {
            var response = _menuItemService.Create(menuItem);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.menuItem);
        }

        [Authorize]
        [HttpPost("Update")]
        public IActionResult Update(MenuItems menuItem)
        {
            var response = _menuItemService.Update(menuItem);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.menuItem);
        }

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete(MenuItems menuItem)
        {
            var response = _menuItemService.Delete(menuItem);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok();
        }
    }
}
