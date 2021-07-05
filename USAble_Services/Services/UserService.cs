using BC = BCrypt.Net.BCrypt;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using USAble_Data;
using USAble_Data.Models;
using USAble_Data.Models.Requests;
using USAble_Data.Models.Responses;
using USAble_Services.Interfaces;
using System.Linq;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using USAble_Data.Models.Dtos;

namespace USAble_Services.Services
{
    public class UserService : IUserService
    {
        private readonly _DBContext _dbContext;
        private readonly AppSettings _appSettings;

        public UserService(_DBContext dbContext, IOptions<AppSettings> appSettings) 
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _dbContext.Users
                .Include(x => x.UserPasswords)
                .Include(x => x.UserRole)
                .SingleOrDefault(x => x.Username == model.Username);

            if (user == null) return null;

            var userPassword = user.UserPasswords.SingleOrDefault(x => x.Active);

            if (!BC.Verify(model.Password, userPassword.Password))
            {
                return null;
            }

            // Verified password is a match for user, generate JWT Token
            var token = GenerateJwtToken(user);

            var userRole = user.UserRole.Name;

            return new AuthenticateResponse(user, userRole, token);
        }

        public Users GetById(int id)
        {
            return _dbContext.Users.SingleOrDefault(x => x.Id == id);
        }

        public Users GetByUsername(int username)
        {
            return _dbContext.Users.SingleOrDefault(x => x.Username == username);
        }

        public List<Users> GetAll(int currentUserId)
        {
            var users = _dbContext.Users
                .Where(x => x.UserRole.Name != "system" && x.Id != currentUserId && x.Active)
                .ToList();

            return users;
        }

        public UserRoles GetUserRoleById(int id)
        {
            return _dbContext.UserRoles.SingleOrDefault(x => x.Id == id);
        }

        public List<UserRoles> GetUserRoles()
        {
            return _dbContext.UserRoles.Where(x => x.Name != "system").ToList();
        }

        public List<int> GetAllUsernames()
        {
            return _dbContext.Users.Select(x => x.Username).ToList();
        }

        public UserResponse Create(Users user)
        {
            using var transction = _dbContext.Database.BeginTransaction();

            var existingUser = GetByUsername(user.Username);

            if (existingUser != null) return new UserResponse("Username already exists");

            var newUser = new Users
            {
                Username = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserRoleId = user.UserRoleId,
                Active = true,
                CreatedBy = user.CreatedBy,
                CreatedDate = DateTime.UtcNow
            };

            _dbContext.Users.Add(newUser);

            _dbContext.SaveChanges();

            var password = GenerateRandomPassword();

            var newPassword = new UserPasswords
            {
                Active = true,
                Password = GetHashedPassword(password),
                CreatedDate = DateTime.UtcNow,
                UserId = newUser.Id
            };

            _dbContext.UserPasswords.Add(newPassword);

            _dbContext.SaveChanges();

            transction.Commit();

            var response = new UserResponse(newUser);
            response.randomPassword = password;

            return response;
        }

        public UserResponse Update(Users user)
        {
            var updatedUser = GetById((int)user.Id);

            if (updatedUser == null) return new UserResponse("The user you're trying to update does not exist");

            updatedUser.FirstName = user.FirstName;
            updatedUser.LastName = user.LastName;
            updatedUser.ModifiedDate = DateTime.UtcNow;
            updatedUser.ModifiedBy = user.ModifiedBy;

            _dbContext.SaveChanges();

            return new UserResponse(updatedUser);
        }

        public UserResponse Delete(Users user)
        {
            var updatedUser = GetById(user.Id);

            if (updatedUser == null) return new UserResponse("The user you're trying to delete does not exist");

            updatedUser.Active = false;
            updatedUser.ModifiedBy = user.ModifiedBy;
            updatedUser.ModifiedDate = DateTime.UtcNow;

            _dbContext.SaveChanges();

            return new UserResponse(updatedUser);
        }

        public UserResponse ResetPassword(UserRequest request)
        {
            var user = request.User;
            var password = request.Password;

            var updatedUser = GetById(user.Id);

            if (updatedUser == null) return new UserResponse("The user you're trying to delete does not exist");

            updatedUser.ModifiedBy = user.ModifiedBy;
            updatedUser.ModifiedDate = DateTime.UtcNow;

            var newPassword = new UserPasswords();

            var oldPassword = _dbContext.UserPasswords
                .Where(x => x.UserId == user.Id && x.Active)
                .SingleOrDefault();

            oldPassword.Active = false;

            string randomPassword = null;

            //Profile password reset
            if (password != null) {
                var pastPasswords = _dbContext.UserPasswords
                        .Where(x => x.UserId == user.Id)
                        .OrderByDescending(x => x.CreatedDate)
                        .Take(3)
                        .ToList();

                var passwordUsed = pastPasswords.Any(x => PasswordCheck(password.Password, x.Password));

                if (passwordUsed) return new UserResponse("New password must be different than the previous 3 passwords");

                newPassword.Password = GetHashedPassword(password.Password);
            }
            else //Random password reset
            {
                randomPassword = GenerateRandomPassword();

                newPassword.Password = GetHashedPassword(randomPassword);

            }

            newPassword.Active = true;
            newPassword.CreatedDate = DateTime.UtcNow;
            newPassword.UserId = updatedUser.Id;

            _dbContext.UserPasswords.Add(newPassword);

            _dbContext.SaveChanges();

            return new UserResponse(updatedUser)
            {
                randomPassword = randomPassword
            };
        }

        private bool PasswordCheck(string password, string existingPassword)
        {
            return BC.Verify(password, existingPassword);
        }

        private string GenerateJwtToken(Users user)
        {
            // generate token that is valid for 12 hours
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(12),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GetHashedPassword(string password)
        {
            var salt = BC.GenerateSalt();
            return BC.HashPassword(password, salt);
        }

        private string GenerateRandomPassword()
        {
            var length = 10;

            // Credit for this goes to https://www.c-sharpcorner.com/article/how-to-generate-a-random-password-in-c-sharp-and-net-core/

            // Create a string of characters, numbers, special characters that allowed in the password  
            string validChars = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?_-";
            Random random = new Random();

            // Select one random character at a time from the string  
            // and create an array of chars  
            char[] chars = new char[length];
            for (int i = 0; i < length; i++)
            {
                chars[i] = validChars[random.Next(0, validChars.Length)];
            }
            return new string(chars);
        }
    }
}
