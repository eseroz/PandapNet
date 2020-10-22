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
    
    public class FormGunlukController : ControllerBase
    {
        PandapDbContext dc;

        public FormGunlukController(PandapDbContext dc)
        {
            this.dc = dc;
        }

 
        public List<FormGunluk> BugunBakilacaklar()
        {
            var liste = dc.FormGunluks.ToList();

            return liste;

        }

        public List<FormGunluk> FormGunlukGetirTarihten(DateTime tarih)
        {
            var kullaniciAdSoyad = "Necati Yıldırım";

            var liste = dc.FormGunluks
                .Where(c=>c.FormOlusturmaTarihi== tarih)
                .ToList();

            if(liste.Count==0 && tarih.Date<=DateTime.Now.Date)
            {
                liste = new List<FormGunluk>();
                foreach (var item in dc.FormTanims)
                {
                    var formGunlukYeni = new FormGunluk();
                    formGunlukYeni.BulunanProblemSayisi = null;
                    formGunlukYeni.FormAd = item.FormAd;
                    formGunlukYeni.FormOlusturmaTarihi = tarih;
                    formGunlukYeni.OperatorAdSoyad = kullaniciAdSoyad;


                    var yatayData = new FormYatayData();
                    yatayData.KullaniciId = kullaniciAdSoyad;
                    yatayData.CevapJson = "{}";
                    yatayData.BulunanProblemSayisi = 0;
                    yatayData.FormAdi = item.FormAd;
                    yatayData.SatirGuid = Guid.NewGuid();
                    yatayData.IslemTarih = DateTime.Now.Date;
                    yatayData.FormGunlukId = formGunlukYeni.Id;


                    formGunlukYeni.YatayData = yatayData;

                    dc.FormGunluks.Add(formGunlukYeni);
                  
                }

                dc.SaveChanges();

            }


            return liste;

        }

 

    }
}
