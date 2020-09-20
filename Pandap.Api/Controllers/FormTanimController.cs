﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Pandap.Api.DataModels;


namespace Pandap.Api.Controllers
{

    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class FormTanimController : ControllerBase
    {
        PandapDbContext dc;

        public FormTanimController(PandapDbContext dc)
        {
            this.dc = dc;
        }


        [HttpGet]
        public IEnumerable<FormTanim> FormlariGetir()
        {
            var result = dc.FormTanims.ToList();
            return result;

        }

        [HttpGet]
        public FormTanim FormGetirById(int id)
        {
            var result = dc.FormTanims.Where(c => c.Id == id).FirstOrDefault();
            return result;

        }
    }

}