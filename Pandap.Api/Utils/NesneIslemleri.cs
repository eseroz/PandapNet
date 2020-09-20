using Microsoft.CSharp.RuntimeBinder;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace ShDenetim.Web.Utils
{

    public static class MyExtensions
    {
        public static string TemizMetin(this String str)
        {
            return str.Replace("\n", "").Replace("\r", "");
        }


        public static object GetPropertyValue(this object o, string member)
        {
            if (o == null) throw new ArgumentNullException("o");
            if (member == null) throw new ArgumentNullException("member");
            Type scope = o.GetType();
            IDynamicMetaObjectProvider provider = o as IDynamicMetaObjectProvider;
            if (provider != null)
            {
                ParameterExpression param = System.Linq.Expressions.Expression.Parameter(typeof(object));
                DynamicMetaObject mobj = provider.GetMetaObject(param);
                GetMemberBinder binder = (GetMemberBinder)Microsoft.CSharp.RuntimeBinder.Binder.GetMember(0, member, scope, new CSharpArgumentInfo[] { CSharpArgumentInfo.Create(0, null) });
                DynamicMetaObject ret = mobj.BindGetMember(binder);
                BlockExpression final = System.Linq.Expressions.Expression.Block(
                    System.Linq.Expressions.Expression.Label(CallSiteBinder.UpdateLabel),
                    ret.Expression
                );
                LambdaExpression lambda = System.Linq.Expressions.Expression.Lambda(final, param);
                Delegate del = lambda.Compile();
                return del.DynamicInvoke(o);
            }
            else
            {
                return o.GetType().GetProperty(member, BindingFlags.Public | BindingFlags.Instance).GetValue(o, null);
            }
        }
    }   

    
    public class NesneIslemleri
    {

     

        public static void NesneOzellikDegerAta(object o, string ozellik, object deger)
        {
            PropertyInfo[] p = o.GetType().GetProperties();
            PropertyInfo pinfo = p.Where(c => c.Name.ToUpper() == ozellik.ToUpper()).FirstOrDefault();



            pinfo.SetValue(o, deger, null);
        }

        public static string NesneOzellikDegerGetir(object o, string ozellik)
        {
            PropertyInfo[] p = o.GetType().GetProperties();
            PropertyInfo pinfo = p.Where(c => c.Name.ToUpper() == ozellik.ToUpper()).FirstOrDefault();

            var u = pinfo.GetValue(o, null);

            if (u != null)
                return u.ToString();
            else
                return "";

        

        }

      
        internal static List<string> NesneOzellikAdListe(object o)
        {
           var u = o.GetType().GetProperties().Select(p => p.Name).ToList();
            return u;
        }
    }
}