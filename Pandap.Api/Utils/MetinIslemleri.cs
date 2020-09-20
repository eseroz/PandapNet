using System;
using System.IO;
using System.Linq;
using System.Numerics;

namespace ShDenetim.Web.Utils
{
    public class MetinIslemleri
    {
     

        public static string MyDosyaAdiEncode(string s)
        {
            return s.ToLower().Replace(' ', '_').Replace('+', '_').Replace('(', '_').Replace(')', '_');
        }
        public static string TrkHarfToEng(string s)
        {
            return s.ToLower().Replace('ç', 'c').Replace('ö', 'o').Replace('ğ', 'g').Replace('ı', 'i').Replace('ş', 's').Replace('ü', 'u');
        }

        public static string AciklamaSoruDegeriGetir(string soruKod, string data)
        {
            string[] soruAçıklamaBirleşik =data.Split('|');

            string soruAciklamasi = soruAçıklamaBirleşik.Where(c => c.ToString().Split(':')[0] == soruKod).SingleOrDefault();
            if (soruAciklamasi == null) return "";
         
            string soruAciklamasiDeger=soruAciklamasi.Replace(soruKod + ":", "");
            return soruAciklamasiDeger;
        }

     


    }
}