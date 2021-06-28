using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using USAble_Data;
using USAble_Services.Interfaces;
using USAble_UnitTests.Helpers;

namespace USAble_UnitTests.UserService_Tests
{
    [TestClass]
    public class UserService_Authenticate
    {
        private readonly IUserService _userService;

        public UserService_Authenticate()
        {
            var helper = new Helper();
            var serviceProvider = helper.GetServiceProvider();

            _userService = serviceProvider.GetService<IUserService>();

            // Setup fake dbContext
            var mockContext = new Mock<_DBContext>();

        }

        [TestMethod]
        public void TestMethod1()
        {

        }
    }
}
