using Microsoft.AspNetCore.Mvc;
using Pandap.Api.Utils;
using System;
using System.IO;

namespace Pandap.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
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

            var httpType = Request.IsHttps ? "https" : "http";

            string dosyaLinkText = $@"<a href={httpType}://{Request.Host}/api/uploadfile/getir?filename={yeniDosyaAdi} target=_blank>{file.FileName}</a>";

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
