using Microsoft.AspNetCore.Mvc;
using USAble_Data.Models.Requests;
using USAble_Services.Interfaces;
using USAble_Web.Helpers;

namespace USAble_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var order = _orderService.GetById(id);
            return Ok(order);
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var orders = _orderService.GetAll();
            return Ok(orders);
        }

        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(OrderSubmitRequest request)
        {
            var submittedOrder = _orderService.Create(request);
            return Ok(submittedOrder);
        }
    }
}
