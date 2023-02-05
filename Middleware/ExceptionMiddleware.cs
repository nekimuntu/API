using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        public IHostEnvironment _env { get; }

        public ExceptionMiddleware(RequestDelegate next,
                                   ILogger<ExceptionMiddleware> logger,
                                   IHostEnvironment env)
        {
            _env = env;
            _next = next;
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context)
		{
			try{
                //We are in the middle of a HttpRequest 
                //If it doesnt fail we go to the next
                //A task that represents the completion of request processing
				//If there is no exception it will go to next context
				await _next(context);
			}catch(Exception ex){
				//This is where we handdle our own exceptions 
				//It will be displayed in the consosle
				_logger.LogError(ex, ex.Message);
				//Then we want to writte our own answers in the context
				context.Response.ContentType = "application/json";
				context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
				var response = _env.IsDevelopment() //We will have more details in Dev environment
					? new ApiException((int) HttpStatusCode.InternalServerError,ex.Message,ex.StackTrace.ToString())
					: new ApiException((int) HttpStatusCode.InternalServerError);

				//We add options because we wont returning the exceptions
				//In an Api Context so it wont be serialized as json

				var options = new JsonSerializerOptions{
					PropertyNamingPolicy = JsonNamingPolicy.CamelCase
				};
				var json = JsonSerializer.Serialize(response,options);

				await context.Response.WriteAsync(json);
			}
		}
    }
}