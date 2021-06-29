using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace USAble_Services.Extensions
{
    public static class JsonExtensions
    {
        public static string ConvertToJsonObject(this Object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }
    }
}
