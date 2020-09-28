using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pandap.Api.DataModels;

namespace Pandap.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class FormYatayDataController : ControllerBase
    {

        PandapDbContext dc;

        public FormYatayDataController(PandapDbContext dc)
        {
            this.dc = dc;
        }

        public FormYatayData FormYatayDataGetir()
        {
            var sonuc = dc.YatayDatas.First();
            return sonuc;
        }

        public FormYatayData FormYatayDataGetirFromId(int formGunlukId,string formAd)
        {
            var sonuc = dc.YatayDatas.FirstOrDefault(c=>c.FormGunlukId== formGunlukId);

            if (sonuc == null) 
            { 
                sonuc = new FormYatayData();
                sonuc.FormGunlukId = formGunlukId;

               dc.YatayDatas.Add(sonuc);
                dc.SaveChanges();

            };


            return sonuc;
        }

     
        [HttpPost]
       public string Kaydet(FormYatayData model)
        {
            return "aaa";
          
        }


    }
}
