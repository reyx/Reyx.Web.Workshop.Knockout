using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using Reyx.Web.Workshop.Knockout.Data.Interfaces;
using Reyx.Web.Workshop.Knockout.Data.Entities;
using System.Security.Cryptography;
using System.IO;
using System.Text;

namespace Reyx.Web.Workshop.Knockout.Data.Repositories
{
    public class UserRepository : AbstractRepository<User>
    {
        private static byte[] bytes = ASCIIEncoding.ASCII.GetBytes("ZeroCool");

        public User Validate(string email, string password)
        {
            try
            {
                password = EncryptPassword(password);
                return All.FirstOrDefault(t => t.Email.ToLower() == email.ToLower() && t.Password == password);
            }
            catch
            {
                return null;
            }
        }

        public static string EncryptPassword(string password)
        {
            if (String.IsNullOrEmpty(password))
            {
                throw new ArgumentNullException("The string which needs to be encrypted can not be null.");
            }

            var cryptoProvider = new DESCryptoServiceProvider();
            var memoryStream = new MemoryStream();
            var cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateEncryptor(bytes, bytes),
                CryptoStreamMode.Write);
            var writer = new StreamWriter(cryptoStream);
            writer.Write(password);
            writer.Flush();
            cryptoStream.FlushFinalBlock();
            writer.Flush();
            return Convert.ToBase64String(memoryStream.GetBuffer(), 0, (int)memoryStream.Length);
        }

        public static string DecryptPassword(string password)
        {
            if (String.IsNullOrEmpty(password))
            {
                throw new ArgumentNullException("The string which needs to be decrypted can not be null.");
            }

            var cryptoProvider = new DESCryptoServiceProvider();
            var memoryStream = new MemoryStream(Convert.FromBase64String(password));
            var cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateDecryptor(bytes, bytes),
                CryptoStreamMode.Read);
            var reader = new StreamReader(cryptoStream);
            return reader.ReadToEnd();
        }
    }
}