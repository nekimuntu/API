using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Core.Interfaces;
using Core.Specifications;
using API.Dtos;
using AutoMapper;
using API.Errors;
using API.Helpers;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepo, 
                                  IGenericRepository<ProductBrand> productBrandRepo,
                                  IGenericRepository<ProductType> productTypeRepo,
                                  IMapper mapper)

        {
            _productRepo = productRepo;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<IReadOnlyList<ProductToReturnDto>>>> getProducts([FromQuery]ProductSpecParams param)
        {
            var specCount = new ProductWithFiltersForCountSpecification(param);
            var spec = new ProductsWithTypesAndBrandsSpecification(param);
            var products = await _productRepo.ListAsync(spec);
            var totalItem = await _productRepo.CountAsync(specCount);
            var data = _mapper.Map<IReadOnlyList<Product>,IReadOnlyList<ProductToReturnDto>>(products);
            
            return Ok(new Pagination<ProductToReturnDto>(
                param.PageIndex,
                param.PageSize,
                totalItem,
                data
            ));
        }

        [HttpGet("{id}")]       
        // for swagger to know aboutit we can add a decoration
        // SECTION 5 swagger
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse),StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductToReturnDto>> getProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
             if(product == null) return NotFound(new ApiResponse(404));
             
            return _mapper.Map<Product,ProductToReturnDto>(product);
        }
         [HttpGet("brands")]
        public async Task<ActionResult<List<ProductBrand>>> getBrands()
        {
            var brands = await _productBrandRepo.ListAllAsync();
            return Ok(brands);
        }
        [HttpGet("types")]
        public async Task<ActionResult<List<ProductType>>> getTypes()
        {
            var types = await _productTypeRepo.ListAllAsync();
            return Ok(types);
        }
    }
}