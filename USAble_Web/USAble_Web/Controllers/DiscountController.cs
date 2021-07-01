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
            var response = new Response();

            try
            {
                var discount = _discountService.GetById(id);

                var discountDto = new DiscountDto(discount);

                response.success = true;
                response.payload = discountDto;

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
                var discounts = _discountService.GetAll();

                var discountsDto = new List<DiscountDto>();

                foreach (var discount in discounts)
                {
                    discountsDto.Add(new DiscountDto(discount));
                }

                response.success = true;
                response.payload = discountsDto;

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
        public IActionResult Create(Discounts discount)
        {
            var response = new Response();

            try
            {
                var discountResponse = _discountService.Create(discount);

                if (discountResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = discountResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new DiscountDto(discountResponse.discount);

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
        public IActionResult Update(Discounts discount)
        {
            var response = new Response();

            try
            {
                var discountResponse = _discountService.Update(discount);

                if (discountResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = discountResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new DiscountDto(discountResponse.discount);

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
        public IActionResult Delete(Discounts discount)
        {
            var response = new Response();

            try
            {
                var discountResponse = _discountService.Delete(discount);

                if (discountResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = discountResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new DiscountDto(discountResponse.discount);

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
