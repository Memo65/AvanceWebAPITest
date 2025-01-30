using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPITest.Custom;
using WebAPITest.Models;

namespace WebAPITest.Services
{
    public class UserService
    {
        private readonly UserManagementContext _context;
        private readonly Utilities _utils;

        public UserService(UserManagementContext context, Utilities utils)
        {
            _context = context;
            _utils = utils;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.Users.FromSqlRaw("EXEC sp_GetUsers;").ToListAsync();
        }
        
        public async Task<IEnumerable<User>> GetUserById(int id)
        {
            SqlParameter userId = new SqlParameter("@userId", id);
            return await _context.Users.FromSqlRaw("EXEC sp_GetUserById @userId", userId).ToListAsync();
        }

        public async Task<bool> CreateUser(User user)
        {
            bool response = false;

            if (!ValidateNoEmpty(user))
                return false;

            try
            {
                string encrypPass = _utils.EncryptSHA256(user.PasswordHash);
                response = await _context.
                    Database.
                    ExecuteSqlInterpolatedAsync($"EXEC sp_CreateUser @username = {user.Username}, @password = {encrypPass}, @email = {user.Email}") > 0 ?
                    true : false;
            }
            catch (Exception ex) { 
                response = false;
            }

            return response;
            
        }

        public async Task<bool> UpdateUser(User user)
        {
            Console.WriteLine(user);
            bool response = false;

            if (!ValidateNoEmpty(user))
                return false;

            try
            {
                response = await _context.
                    Database.
                    ExecuteSqlInterpolatedAsync($"EXEC sp_UpdateUser @userId = {user.Id}, @username = {user.Username}, @password = {_utils.EncryptSHA256(user.PasswordHash)}, @email = {user.Email}") > 0 ?
                    true: false;
            }
            catch (Exception ex)
            {
                response = false;
            }

            return response;
        }

        public async Task<bool> DeleteUser(int id)
        {
            bool response = false;
            try
            {
                SqlParameter userId = new SqlParameter("@userId", id);

                response = await _context.
                    Database.
                    ExecuteSqlInterpolatedAsync($"EXEC sp_DeleteUser @userId = {userId}") > 0?
                    true : false;
            }
            catch (Exception ex)
            {
                response = false;
            }

            return response;
        }

        public bool ValidateNoEmpty(User user)
        {
            if (user.Username.Length == 0 || user.PasswordHash.Length == 0 || user.Email.Length == 0)
                return false;

            return true;
        }
    }
}
