using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pandap.Api.Utils;
using ShDenetim.Web.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Mime;
using System.Runtime.InteropServices.ComTypes;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;

namespace Pandap.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [EnableCors("AllowOrigin")]
    public class UploadFileController:ControllerBase
    {
        [RequestFormLimits(MultipartBodyLengthLimit = 2097152000)]
        [RequestSizeLimit(2097152000)]
        [HttpPost]
        public string[] Yukle()
        {
            string uploadDirectory = @"\uploads\";

            var file= Request.Form.Files[0];

            var acceptType = new string[] { "video", "audio", "image" };

            //if (file.ContentType.Contains) ReturnValueNameAttribute;

            var yeniDosyaAdi = DosyaIslemleri.YeniDosyaAdiGuidli("FormAd", 6777766, "S02", file.FileName, Guid.NewGuid());

            var path = Directory.GetParent(Directory.GetCurrentDirectory()) + uploadDirectory + yeniDosyaAdi;
            FileStream fs = new FileStream(path,FileMode.Create);

            file.CopyTo(fs);
            fs.Flush();
            fs.Close();

           

            string dosyaLinkText = @"<a href=http://localhost:63075/api/uploadfile/getir?filename=" + yeniDosyaAdi + " target=_blank>" + file.FileName + "</a>";

            return new string[] { dosyaLinkText }; 

        }

        [HttpGet]
        public  IActionResult Getir(string filename)
        {
            string uploadDirectory = @"\uploads\";
            var path = Directory.GetParent(Directory.GetCurrentDirectory()) + uploadDirectory + filename;

            var contentType = DosyaIslemleri.GetMimeType(filename);

            Stream stream = System.IO.File.OpenRead(path);

         

            if (stream == null)
                return NotFound();

            var sonuc= File(stream, contentType);

            return sonuc;

        }

    }

}
