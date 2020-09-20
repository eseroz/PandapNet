using System;
using System.Net.Mail;

namespace ShDenetim.Web.Utils
{
    public class MailGonder
    {
        public static void mailgonder(string gidecekMailAdresi, string konubasligi, string icerik)
        {
           

            SmtpClient saglikClient = new SmtpClient
            {
                Host = "eposta.saglik.gov.tr",
                Port = 25,
                EnableSsl = false,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("shgm.denetim@saglik.gov.com", "xxx")
            };


            try
            {
                saglikClient.Send("shgm.denetim@saglik.gov.tr", gidecekMailAdresi, konubasligi, icerik);
            }
            catch (Exception ex)
            {
                throw ex;
            }
           

        }

    }

}