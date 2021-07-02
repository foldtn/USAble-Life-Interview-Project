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
            var response = new Response();

            try
            {
                var order = _orderService.GetById(id);

                var orderDto = new OrderDto(order);

                response.success = true;
                response.payload = orderDto;

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
                var orders = _orderService.GetAll();

                var ordersDto = new List<OrderDto>();

                foreach (var order in orders)
                {
                    ordersDto.Add(new OrderDto(order));
                }

                response.success = true;
                response.payload = ordersDto;

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
        public IActionResult Create(OrderRequest request)
        {
            var response = new Response();

            try
            {
                var orderResponse = _orderService.Create(request);

                if (orderResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = orderResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                    response.payload = orderResponse.order.Id;
                }

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
