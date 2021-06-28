using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using USAble_Data;
using USAble_Data.Models.Dtos;
using USAble_Services.Interfaces;
using USAble_Web.Helpers;

namespace USAble_Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxController : ControllerBase
    {
        private ITaxService _taxService;

        public TaxController(ITaxService taxService)
        {
            _taxService = taxService;
        }

        [Authorize]
        [HttpGet("GetById")]
        public IActionResult GetById(int id)
        {
            var tax = _taxService.GetById(id);
            var taxDto = new TaxDto(tax);
            return Ok(taxDto);
        }

        [Authorize]
        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            var taxes = _taxService.GetAll();

            var taxesDto = new List<TaxDto>();

            foreach (var tax in taxes)
            {
                taxesDto.Add(new TaxDto(tax));
            }

            return Ok(taxesDto);
        }

        [Authorize]
        [HttpPost("Create")]
        public IActionResult Create(Taxes tax)
        {
            var response = _taxService.Create(tax);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.tax);
        }

        [Authorize]
        [HttpPost("Update")]
        public IActionResult Update(Taxes tax)
        {
            var response = _taxService.Update(tax);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok(response.tax);
        }

        [Authorize]
        [HttpPost("Delete")]
        public IActionResult Delete(Taxes tax)
        {
            var response = _taxService.Delete(tax);

            if (response.errorMessage != null)
                return BadRequest(new { message = response.errorMessage });

            return Ok();
        }
    }
}
