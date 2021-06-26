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

namespace USAble_Services.Services
{
    public class UserService : IUserService
    {
        private readonly _USAbleDbContext _dbContext;
        private readonly AppSettings _appSettings;

        public UserService(_USAbleDbContext dbContext, IOptions<AppSettings> appSettings) 
        {
            _dbContext = dbContext;
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var testSalt = "$2a$11$DC4eeBKj0imYslNZJPW/bu";
            var testPassword = BC.HashPassword(model.Password, testSalt);

            var user = _dbContext.User.SingleOrDefault(x => x.Username == model.Username);

            if (user == null) return null;

            var userPassword = user.UserPassword.SingleOrDefault(x => x.Active);

            var passwordToAuth = BC.HashPassword(model.Password, userPassword.Salt);

            if (!BC.Verify(userPassword.Password, passwordToAuth))
            {
                return null;
            }

            // Verified password is a match for user, generate JWT Token
            var token = generateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public User GetById(int userId)
        {
            throw new NotImplementedException();
        }

        public List<User> GetAll()
        {
            throw new NotImplementedException();
        }

        public User Update()
        {
            throw new NotImplementedException();
        }

        public void Delete()
        {
            throw new NotImplementedException();
        }

        private string generateJwtToken(User user)
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
    }
}
