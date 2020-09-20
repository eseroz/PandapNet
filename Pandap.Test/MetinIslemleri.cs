using Microsoft.VisualStudio.TestTools.UnitTesting;
using Pandap.Api.Utils;
using ShDenetim.Web.Utils;
using System;
using System.IO;

namespace Pandap.Test
{
    [TestClass]
    public class MetinIslemleri_UnitTest
    {
        [TestMethod]
        public void MyDosyaAdiEncodeTestMethod1()
        {
            string s = "(gok)mus +ankara x";
            var u = MetinIslemleri.MyDosyaAdiEncode(s);

            Assert.AreEqual("_gok_mus__ankara_x", u);
        }

        [TestMethod]
        public void TrkHarfToEngTestMethod1()
        {


            string s = "çankaya önünde aðaç içinde ýþýk var";
            var u = MetinIslemleri.TrkHarfToEng(s);

            Assert.AreEqual("cankaya onunde agac icinde isik var", u);


        }




        [TestMethod]
        public void AciklamaSoruDegeriGetirTest()
        {
            string data = "S02:Açýklama02|S03:sdfasdfasdf|S09:ddfgdfgdfg|S10:Açýklama10|S11:dfgdfg|S14:dfgdfgdfgdfg dfgsdfgsdfgsdfgsd|S15:dfgdfgdsfgdfg";
            var u1 = MetinIslemleri.AciklamaSoruDegeriGetir("S01", data);
            var u2 = MetinIslemleri.AciklamaSoruDegeriGetir("S02", data);
            var u3 = MetinIslemleri.AciklamaSoruDegeriGetir("S10", data);

            Assert.AreEqual("", u1);
            Assert.AreEqual("Açýklama02", u2);
            Assert.AreEqual("Açýklama10", u3);

        }

        [TestMethod]
        public void YeniDosyaAdiGuidli()
        {
            var guid = Guid.Parse("f540bd9c-f95f-4933-852f-06f066955697");
            var fileName = "dünyaresim.jpeg";
            var soruKod = "S02";
            var formAd = "KestiriciBakým";
            var yataySatirId = 34443444433;

            var actual= DosyaIslemleri.YeniDosyaAdiGuidli(formAd, yataySatirId, soruKod, fileName, guid);
            var expected = "kestiricibakim_34443444433_S02_dunyaresim_f54.jpeg";

            Assert.AreEqual(expected,actual);

        }

    }
}
