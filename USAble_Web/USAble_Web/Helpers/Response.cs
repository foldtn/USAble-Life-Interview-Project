using System;

namespace USAble_Web.Helpers
{
    public class Response
    {
        public bool success { get; set; }
        public Object payload { get; set; }
        public string error { get; set; }
    }
}
