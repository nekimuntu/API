using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    
    public class BasketController : BaseApiController
    {
        public IBasketRepository _BasketRepository; 
        
        public BasketController(IBasketRepository basketRepository)
        {
            _BasketRepository = basketRepository;
            
        }
        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasketId(string id)
        {
            var basket = await _BasketRepository.GetBasketAsync(id);
            return Ok(basket ?? new CustomerBasket(id) );
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket(CustomerBasket basket)
        {
           var updateBasket = await _BasketRepository.UpdateBasketAsync(basket);
           return Ok(updateBasket);
        }

        [HttpDelete]
        public async Task DeleteBasket(string id){
            await _BasketRepository.DeleteBasketAsync(id);            
        }
    }
}