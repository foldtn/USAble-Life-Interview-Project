using System;
using System.Collections.Generic;
using System.Text;

namespace USAble_Services.Extensions
{
    public static class StringExtensions
    {
        public static bool HasValue(this string val)
        {
            return !string.IsNullOrEmpty(val);
        }
    }
}
