using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using USAble_Data;
using USAble_Services.Services;

namespace USAble_UnitTests.UserService_Tests
{
    [TestClass]
    public class UserService_Authenticate
    {
        private readonly UserService _userService;

        public UserService_Authenticate()
        {
            // Setup fake dbContext
            var mockContext = new Mock<_USAbleDbContext>();

            _userService = new UserService(mockContext.Object);
        }

        /*
         * Check if no error is thrown when Username and Password match
         * Check if error is thrown when
         *      Username doesn't match and Password does match
         *      Username does match and Password doesn't match
         *      Username doesn't match and Password doesn't match
         */

        [TestMethod]
        public void TestMethod1()
        {
        }
    }
}
