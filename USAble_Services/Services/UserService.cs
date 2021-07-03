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
            var user = _dbContext.Users.SingleOrDefault(x => x.Id == id);

            return user;
        }

        public Users GetByUsername(int username)
        {
            var user = _dbContext.Users.SingleOrDefault(x => x.Username == username);

            return user;
        }

        public List<Users> GetAll()
        {
            var users = _dbContext.Users.ToList();

            return users;
        }

        public UserResponse Create(Users user, UserPasswords password)
        {
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

            var newPassword = new UserPasswords
            {
                Password = GetHashedPassword(password.Password),
                CreatedDate = DateTime.UtcNow,
                UserId = user.Id
            };

            _dbContext.UserPasswords.Add(newPassword);

            _dbContext.SaveChanges();

            return new UserResponse(newUser);
        }

        public UserResponse Update(Users user, UserPasswords password = null)
        {
            var updatedUser = GetById(user.Id);

            if (updatedUser == null) return new UserResponse("The user you're trying to update does not exist");

            updatedUser.Username = user.Username;
            updatedUser.FirstName = user.FirstName;
            updatedUser.LastName = user.LastName;
            updatedUser.ModifiedDate = DateTime.UtcNow;
            updatedUser.ModifiedBy = user.ModifiedBy;

            if (password != null)
            {
                var pastPasswords = _dbContext.UserPasswords
                    .Where(x => x.UserId == user.Id)
                    .OrderByDescending(x => x.CreatedDate)
                    .Take(3);

                var passwordUsed = pastPasswords.Any(x => PasswordCheck(password.Password, x.Password));

                if (passwordUsed) return new UserResponse("New password must be different than the previous 3 passwords");

                var newPassword = new UserPasswords
                {
                    Password = GetHashedPassword(password.Password),
                    CreatedDate = DateTime.UtcNow,
                    UserId = user.Id
                };

                _dbContext.UserPasswords.Add(newPassword);
            }

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
    }
}
