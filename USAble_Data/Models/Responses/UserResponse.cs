namespace USAble_Data.Models.Responses
{
    public class UserResponse
    {
        public Users user { get; set; }
        public string errorMessage { get; set; }

        public UserResponse(Users user)
        {
            this.user = user;
        }

        public UserResponse(string errorMessage)
        {
            this.errorMessage = errorMessage;
        }
    }
}
