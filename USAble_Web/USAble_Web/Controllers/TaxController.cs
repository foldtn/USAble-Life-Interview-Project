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
    public class TaxController : ControllerBase
    {
        private readonly ITaxService _taxService;

        public TaxController(ITaxService taxService)
        {
            _taxService = taxService;
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var response = new Response();

            try
            {
                var tax = _taxService.GetById(id);

                var taxDto = new TaxDto(tax);

                response.success = true;
                response.payload = taxDto;

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
                var taxes = _taxService.GetAll();

                var taxesDto = new List<TaxDto>();

                foreach (var tax in taxes)
                {
                    taxesDto.Add(new TaxDto(tax));
                }

                response.success = true;
                response.payload = taxesDto;

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
        public IActionResult Create(Taxes tax)
        {
            var response = new Response();

            try
            {
                var taxResponse = _taxService.Create(tax);

                if (taxResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = taxResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new TaxDto(taxResponse.tax);

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
        public IActionResult Update(Taxes tax)
        {
            var response = new Response();

            try
            {
                var taxResponse = _taxService.Update(tax);

                if (taxResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = taxResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new TaxDto(taxResponse.tax);

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
        public IActionResult Delete(Taxes tax)
        {
            var response = new Response();

            try
            {
                var taxResponse = _taxService.Delete(tax);

                if (taxResponse.errorMessage.HasValue())
                {
                    response.success = false;
                    response.error = taxResponse.errorMessage;
                }
                else
                {
                    response.success = true;
                }

                response.payload = new TaxDto(taxResponse.tax);

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
