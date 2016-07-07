using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CoreWebApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CoreWebApp.Controllers
{
    [Route("api/[controller]")]
    public class PuppiesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<Puppy> Get()
        {
            return new Puppy[] {
                new Puppy { name = "Porter" },
                new Puppy { name = "Mal" },
                new Puppy { name = "Razzle" },
                new Puppy { name = "Koby" },
                new Puppy { name = "Molly" },
                new Puppy { name = "Husi" }
            };
        }
    }
}
