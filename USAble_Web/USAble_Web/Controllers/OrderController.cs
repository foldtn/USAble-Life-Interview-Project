using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
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
        private IDiscountService _discountService;
        private ITaxService _taxService;
        private IMenuItemService _menuItemService;
        private IMenuItemCategoryService _categoryService;
        private IUserService _userService;

        public OrderController(
            IOrderService orderService,
            IDiscountService discountService,
            ITaxService taxService,
            IMenuItemService menuItemService,
            IMenuItemCategoryService categoryService,
            IUserService userService
        )
        {
            _orderService = orderService;
            _discountService = discountService;
            _taxService = taxService;
            _menuItemService = menuItemService;
            _categoryService = categoryService;
            _userService = userService;
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var response = new Response();

            try
            {
                var order = _orderService.GetById(id);

                var user = _userService.GetById(order.CreatedBy);

                var orderDto = new OrderDto(order, user);

                if (order.DiscountId != null)
                {
                    orderDto.Discount = new DiscountDto(_discountService.GetById((int)order.DiscountId));
                }

                foreach(var tax in order.OrderTaxes)
                {
                    orderDto.Taxes.Add(new TaxDto(_taxService.GetById(tax.TaxId)));
                }

                foreach(var menuItem in order.OrderMenuItems)
                {
                    var item = _menuItemService.GetById(menuItem.MenuItemId);

                    orderDto.MenuItems.Add(new OrderMenuItemDto()
                    {
                        MenuItem = new MenuItemDto(item),
                        CategoryName = (item.MenuItemCategoryId != null) 
                            ? _categoryService.GetById((int)item.MenuItemCategoryId).Name 
                            : null,
                        Quantity = menuItem.Quantity
                    });
                }

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
                    var user = _userService.GetById(order.CreatedBy);
                    ordersDto.Add(new OrderDto(order, user));
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
