using Microsoft.AspNetCore.Mvc;
using USAble_Data;
using USAble_Services.Interfaces;
using USAble_Web.Helpers;

namespace USAble_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DiscountController : ControllerBase
    {
        private IDiscountService _discountService;

        public DiscountController(IDiscountService discountService)
        {
            _discountService = discountService;
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var discount = _discountService.GetById(id);
            return Ok(discount);
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var discounts = _discountService.GetAll();
            return Ok(discounts);
        }

        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(Discounts discount)
        {
            var response = _discountService.Create(discount);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.discount);
        }

        [Authorize]
        [HttpPost("Update")]
        public IActionResult Update(Discounts discount)
        {
            var response = _discountService.Update(discount);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.discount);
        }

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete(Discounts discount)
        {
            var response = _discountService.Delete(discount);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok();
        }
    }
}
