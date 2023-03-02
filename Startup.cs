using API.Errors;
using API.Extensions;
using API.Helpers;
using API.Middleware;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public int IConnectionMultiplexer { get; private set; }

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ///SECTION 5 final 
            /// Every services are moved to ApplicationServicesExtensions
            //This is more for esthetic and readability 
            services.AddApplicationServices(_configuration);
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
            // app.UseDeveloperExceptionPage();
           
             ///SECTION 5 video 52 : Errors handling with Middleware
            //It needs to be after UseStatus.... in The version with Startup.cs 
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseStatusCodePagesWithReExecute("/Error/{0}");
            ///End Section 5 \\\
            
           
            ///SECTION 5 we delete the if statement that would activate Swagger for Dev only
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));

            
            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseStaticFiles();
            ///SECTION 6 CORS \\\\
            ///Important to place it before UseAuthorization 
            app.UseCors("CorsPolicy");
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            
            
        }
    }
}
