using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Errors
{
    ///SECTION 5 ERRORS handling Video 53
    public class ApiValidationErrorResponse : ApiResponse
    {
        //Specific classe for validation errors
        public ApiValidationErrorResponse() : base(400)
        {
        }
        public IEnumerable<string> Errors { get; set; }
    }
}