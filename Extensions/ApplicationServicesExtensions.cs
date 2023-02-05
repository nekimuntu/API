using API.Errors;
using API.Helpers;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
                                                            IConfiguration config){

        ///SECTION 4 Generic Repository and SPecifications
            services.AddScoped<IProductRepository,ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>),typeof(GenericRepository<>));
            ///End S4 \\\
            services.AddAutoMapper(typeof(MappingProfiles));
            services.AddControllers();                     
            services.AddDbContext<StoreContext>(x=>
                                    x.UseSqlite(config.GetConnectionString("DefaultConnection")));
            
            ///SECTION 5 video 53: Errors Handling | Validation errors
            ///I place it here to be able to handle any exceptions raised by the services above
            services.Configure<ApiBehaviorOptions>(options => {
                options.InvalidModelStateResponseFactory = actionContext =>{
                    //This part flattened the error response by passing only the nessages
                    //It will not gives all the stack of possible validation errors
                    var errors = actionContext.ModelState
                                    .Where(e=> e.Value.Errors.Count > 0)
                                    .SelectMany(x =>x.Value.Errors)
                                    .Select(x => x.ErrorMessage).ToArray();

                    var errorResponse = new ApiValidationErrorResponse{
                                                Errors = errors
                                                };
                    return new BadRequestObjectResult(errorResponse);
                };
            });
            /// End Section 5 \\\   
        return services;
        }
                                                            
    }
}