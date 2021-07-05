namespace USAble_Data.Models.Requests
{
    public class UserRequest
    {
        public Users User { get; set; }
        public UserPasswords Password { get; set; }

        public UserRequest()
        {

        }

        public UserRequest(Users user)
        {
            this.User = user;
        }
    }
}
