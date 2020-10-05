namespace pandap.api.Controllers
{
    public class User
    {
        public int Id { get; internal set; }
        public string FirstName { get; internal set; }
        public string LastName { get; internal set; }
        public string Username { get; internal set; }
        public string Password { get; internal set; }
        public string Token { get;  set; }
    }
}