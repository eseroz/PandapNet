using Microsoft.AspNetCore.StaticFiles;
using ShDenetim.Web.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;

namespace Pandap.Api.Utils
{
    public class DosyaIslemleri
    {
        public static string YeniDosyaAdiGuidli(string formAd, BigInteger satirId, string soruKod, string fileName, Guid guid)
        {
            string guid5Hane = guid.ToString().Substring(0, 3);
            string fileEng = MetinIslemleri.TrkHarfToEng(MetinIslemleri.MyDosyaAdiEncode(fileName));

            string extension = Path.GetExtension(fileName);
            var sadecefileName = Path.GetFileNameWithoutExtension(fileEng);

            string yeniDesen = MetinIslemleri.TrkHarfToEng(formAd) + "_" + satirId + "_" + soruKod + "_" +  sadecefileName + "_" + guid5Hane;

            string newUploadFileName = yeniDesen + extension;

            return newUploadFileName;
        }

        public static string GetMimeType(string fileName)
        {
           
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(fileName, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}
