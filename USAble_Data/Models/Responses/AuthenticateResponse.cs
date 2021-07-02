namespace USAble_Data.Models.Responses
{
    public class AuthenticateResponse
    {
        public int Id { get; set; }
        public int Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserRole { get; set; }
        public string Token { get; set; }

        public AuthenticateResponse(Users user, string userRole, string token)
        {
            Id = user.Id;
            Username = user.Username;
            FirstName = user.FirstName;
            LastName = user.LastName;
            UserRole = userRole;
            Token = token;
        }
    }
}
