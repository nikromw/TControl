using Auth.Api.Models;
using Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters.Xml;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using ReadModel.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using WriteModel;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;

namespace Auth.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IOptions<AuthOptions> authOptions;
        private WRContext _dbContext;

        public AuthController(IOptions<AuthOptions> authOptions, WRContext wRContext)
        {
            this.authOptions = authOptions;
            _dbContext = wRContext;
        }

        [Route("regUser")]
        [HttpPost]
        public IActionResult Registration([FromBody] Registration request)
        {
            if (_dbContext.Accounts.Where(x => x.EMail == request.Email).Any())
                return StatusCode(403 , "Такой пользователь уже зарегестрирован.");

            _dbContext.Accounts.Add(new Account()
            {
                EMail = request.Email,
                Password = request.Password,
                Id = Guid.NewGuid(),
                Photo = request.Photo
            });

            _dbContext.SaveChanges();

            var token = Authenticate(request.Email, request.Password);

            if (token == null)
                return StatusCode(403, "Authentication error");

            return Ok(new {access_token = token});
        }

        [Route("login")]
        [HttpPost]
        public IActionResult Login([FromBody] Login request)
        {
            var token = Authenticate(request.Email, request.Password);

            if(token == null)
                return StatusCode(403, "Authorization error.");

            return Ok(new { access_token = token });
        }

        private string Authenticate(string email, string password)
        {
            var user = AuthenticateUser(email, password);

            if (user == null)
                return null;

            user.Password = null;
            WRContext.SetCurrentUser(user);

            return  GenerateJWT(user);
        }

        [HttpGet]
        [Authorize]
        [Route("getAccount")]
        public JsonResult GetAccount()
        {
            return new JsonResult(WRContext.Account);
        }

        private Account AuthenticateUser(string email, string password)
            => _dbContext.Accounts.SingleOrDefault(x => x.EMail == email && x.Password == password);

        private string GenerateJWT(Account user)
        {
            var authParams = authOptions.Value;
            var securityKey = authParams.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.EMail),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

                claims.Add(new Claim("role", user.Roles.ToString()));

            var token = new JwtSecurityToken(authParams.Issuer,
                authParams.Audience,
                claims,
                expires: DateTime.Now.AddSeconds(authParams.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
